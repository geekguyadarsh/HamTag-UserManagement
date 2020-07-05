var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
    unique: true,
    trim: true,
  },
  city: {
    type: String,
  },
  gender: {
    type: String,
    default: "Male",
    enum: ["Male", "Female"],
  },
});

module.exports = mongoose.model("User", userSchema);
