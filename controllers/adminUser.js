var User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "User doesn't exists in our Database",
      });
    }
    req.user = user;
    next();
  });
};

exports.createUser = (req, res) => {
  const { name, email, phoneNo, city, gender } = req.body;
  if (!name || !email || !phoneNo || !city || !gender) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "Unable to save User to the database",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
      phoneNo: user.phoneNo,
      city: user.city,
      gender: user.gender,
      id: user._id,
    });
  });
};

exports.getUser = (req, res) => {
  req.profile.updatedAt = undefined;
  req.profile.createdAt = undefined;
  return res.json(req.user);
};

exports.getAllUsers = (req, res) => {
  // let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "updatedAt";
  User.find()
    .populate("category")
    .sort([[sortBy, "asc"]])
    .exec((err, users) => {
      if (err) {
        res.status(400).json({
          error: "No users found",
        });
      }
      res.json(users);
    });
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "error while updating the user",
        });
      }
      return res.json(user);
    }
  );
};

exports.deleteUser = (req, res) => {
  const user = req.user;
  user.remove((err, user) => {
    if (err) {
      return res.json({
        error: "unable to delete user",
      });
    }
    return res.json(`Delection of ${user.name} was a success`);
  });
};
