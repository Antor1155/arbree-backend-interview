const { Schema, model, Types } = require("mongoose");
const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    index: true,
  },
  hash: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
