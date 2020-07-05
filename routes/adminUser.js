const express = require("express");
const app = express();
const {
  createUser,
  getUserById,
  getUser,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/adminUser");

const { isSignedIn } = require("../controllers/auth");

app.param("userId", getUserById);

app.post("/user/create", isSignedIn, createUser);

app.get("/user/:userId", isSignedIn, getUser);

app.get("/users", isSignedIn, getAllUsers);

app.put("/user/:userId", isSignedIn, updateUser);

app.delete("/user/:userId", isSignedIn, deleteUser);

module.exports = app;
