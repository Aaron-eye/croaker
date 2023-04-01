//@ts-nocheck

import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";
import filterSensiviteFields from "../utils/filterSensiviteFields.js";

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "Please tell us your name"],
    unique: true,
  },
  bio: {
    type: String,
    default: "Hi there! I am using Croaker.",
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  photo: {
    type: String,
    default: "default-photo.png",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Your password should have more than 8 characters"],
    select: false,
    sensivite: true,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el: string) {
        return el === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  following: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  followers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  croaks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Croak",
    },
  ],
  likedCroaks: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Croak",
    },
  ],
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.index({ nickname: 1 });
userSchema.index({ email: 1 });
userSchema.index({ following: 1 });
userSchema.index({ followers: 1 });
userSchema.index({ croaks: 1 });
userSchema.index({ likedCroaks: 1 });

userSchema.add({
  sensivite: { type: Boolean, default: false },
});

userSchema.plugin(uniqueValidator, {
  message: "This {PATH} is already being used",
});

userSchema.pre("save", async function (next: Function) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next: Function) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.pre(/^find/, function (next: Function) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp: any) {
  if (this.passwordChangedAt) {
    const changedTimestamp =
      this.passwordChangedAt.getTime() / 1000; /*parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );*/

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

interface IUser {
  password: String;
}
interface IUserMethods {
  correctPassword: Function;
}
type UserModel = Model<IUser, IUserMethods>;
const User = mongoose.model<UserModel>("User", userSchema);

export default User;
