const mongoose = require("mongoose"),
  { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
