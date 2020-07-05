var AdminUser = require("../models/adminUser");
var jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
var expressJwt = require("express-jwt");

exports.emailSignin = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  AdminUser.findOne({ email }, (err, adminUser) => {
    if (err || !adminUser) {
      return res.status(400).json({
        error: "User does not exists in our database",
      });
    }

    if (!adminUser.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    0;
    const token = jwt.sign({ _id: adminUser._id }, "asecret");

    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, role } = adminUser;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//  TODO:

exports.phoneSignin = (req, res) => {
  const { phoneNo, passCode } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  AdminUser.findOne({ phoneNo }, (err, adminUser) => {
    if (err || !adminUser) {
      return res.status(400).json({
        error: "User does not exists in our database",
      });
    }

    const token = jwt.sign({ _id: adminUser._id }, "asecret");

    res.cookie("token", token, { expire: new Date() + 9999 });

    const { _id, name, email, phoneNo, role } = adminUser;
    return res.json({ token, user: { _id, name, email, phoneNo, role } });
  });
};

exports.signup = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const adminUser = new AdminUser(req.body);
  adminUser.save((err, adminUser) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Unable to save User to the database",
      });
    }
    res.json({
      name: adminUser.name,
      email: adminUser.email,
      phoneNo: adminUser.phoneNo,
      id: adminUser._id,
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout successfully",
  });
};

exports.isSignedIn = expressJwt({
  secret: "asecret",
  userProperty: "auth",
  algorithms: ["HS256"],
});
