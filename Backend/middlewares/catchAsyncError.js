import mongoose from "mongoose";
mongoose.Promise = global.Promise;

export const catchAsyncError = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
