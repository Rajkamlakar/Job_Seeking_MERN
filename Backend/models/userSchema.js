import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide your name!"],
    minLength: [3, "Name must contain at least 3 characters!"],
    maxLength: [30, "Name canot exceed 30 characters!"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    validator: [validator.isEmail, "Please provide a valid email!"],
  },
  phone: {
    type: Number,
    required: [true, "Please provide your phone number"],
  },
  password: {
    type: String,
    required: [true, "please provide your password!"],
    minLength: [8, "password must contain at least 8 characters!"],
    maxLength: [32, "Password canot exceed 32 characters!"],
    select: false, //it will not show the password  when u will get the user on body.row(in postman)
  },
  role: {
    type: String,
    required: [true, "Please provide your role"],
    enum: ["Job Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//HASHING THE PASSWORD
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// COMPAIRING PASSWORD
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//GENERATING A JWT TOKEN FOR AUTHORIZATION
userSchema.methods.getJWTTOken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const User = mongoose.model("User", userSchema);
