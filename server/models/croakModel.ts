//@ts-nocheck

import mongoose from "mongoose";

const croakSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  text: {
    type: String,
    required: [true, "Please write something"],
    maxlength: [1000, "Please write something with less than 1000 characters"],
  },
  postedAt: Date,
});

croakSchema.pre("save", function(next: Function) {
  this.postedAt = Date.now() - 1000;
  next();
});

interface ICroak {}
interface ICroakMethods {}
type CroakModel = Model<ICroak, ICroakMethods>;
const Croak = mongoose.model<CroakModel>("Croak", croakSchema);

export default Croak;
