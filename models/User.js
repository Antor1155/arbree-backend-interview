const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true, // corrected 'require' to 'required'
      unique: true,
      index: true,
    },
    hash: {
      type: String,
      required: true, // corrected 'require' to 'required'
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
