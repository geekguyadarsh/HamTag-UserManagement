const express = require("express");
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var cors = require("cors");
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

let authRoutes = require("./routes/auth.js");
let adminUserRoutes = require("./routes/adminUser.js");

mongoose
  .connect("mongodb://localhost:27017/hamtag", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB CONNECTED"));

app.use("/api", authRoutes);
app.use("/api", adminUserRoutes);

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App is listening at PORT ${port}`));
