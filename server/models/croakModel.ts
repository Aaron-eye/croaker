//@ts-nocheck
import mongoose from "mongoose";
import config from "./../config/global-config.json" assert { type: "json" };
const { croakMaximumLength } = config;

const croakSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Please write something"],
    maxlength: [
      croakMaximumLength,
      `Please write something with less than ${croakMaximumLength} characters`,
    ],
    minLength: [1, `Please write something`],
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  /*comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Croak",
    },
  ],*/
  postedAt: Date,
});

croakSchema.pre("save", function (next: Function) {
  this.postedAt = Date.now() - 1000;
  next();
});

interface ICroak {}
interface ICroakMethods {}
type CroakModel = Model<ICroak, ICroakMethods>;
const Croak = mongoose.model<CroakModel>("Croak", croakSchema);

export default Croak;
