var express = require("express");
const app = express();
var {
  signup,
  emailSignin,
  signout,
  phoneSignin,
  isSignedIn,
} = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

app.post(
  "/signup",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    check("email").isEmail().withMessage("email is required"),
    check("password")
      .isLength({ min: 5 })
      .withMessage("password must be at least 5 chars long"),
  ],
  signup
);

app.post(
  "/emailsignin",
  [
    check("email").isEmail().withMessage("Email is required"),
    check("password")
      .isLength({ min: 1 })
      .withMessage("password field is required"),
  ],
  emailSignin
);

app.post(
  "/phonesignin",
  [
    check("phoneNo").isNumeric().withMessage("Phone number is required"),
    check("passCode")
      .equals("0101")
      .isLength({ min: 4 })
      .isLength({ max: 4 })
      .withMessage("Invalid OTP"),
  ],
  phoneSignin
);

app.get("/signout", signout);

app.get("/testroute", isSignedIn, (req, res) => {
  res.send("A protected route");
});

module.exports = app;
