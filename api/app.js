const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cp = require("cookie-parser");
const fs = require("fs");
require("dotenv").config();

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cp());
app.use(express.json());
app.use("/uploads", express.static(__dirname + "/uploads"));

const port = process.env.PORT || 4000;
const uri = process.env.ATLAS_URI;
const salt = bcrypt.genSaltSync(10);
const key = "6k2jshgo60992jvm5qt";
const uploadMiddleware = multer({ dest: "uploads/" });

const userModel = require("./models/userModel");
const blogModel = require("./models/blogModel");

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB connected");
});

app.get("/user", (req, res) => {
  userModel.find().then((response) => {
    res.json(response);
  });
});

app.post("/signup", (req, res) => {
  const { username, password } = req.body;
  userModel
    .create({ username, password: bcrypt.hashSync(password, salt) })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.json(err));
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  userModel.find({ username }).then((response) => {
    if (response.length > 0) {
      const pass = bcrypt.compareSync(password, response[0].password);
      if (pass) {
        jwt.sign({ username, id: response[0]._id }, key, {}, (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json({ username, id: response[0]._id });
        });
      } else {
        res.status(400).json("Error: Wrong credentials");
      }
    } else {
      res.status(400).json("Error: Wrong credentials");
    }
  });
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, key, {}, (err, info) => {
      if (err) throw err;
      res.json(info);
    });
  }
});

app.get("/logout", (req, res) => {
  res.cookie("token", "").json("OK");
});

app.get("/create", (req, res) => {
  res.json("create");
});

app.post("/create", uploadMiddleware.single("file"), (req, res) => {
  let newPath = "";
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }
  const { token } = req.cookies;
  jwt.verify(token, key, {}, (err, info) => {
    if (err) alert("Error!");
    const { title, summary, content } = req.body;
    blogModel
      .create({
        title,
        content,
        summary,
        image: newPath,
        author: info.id,
      })
      .then((response) => res.json(response))
      .catch((err) => res.status(400).json(err));
  });
});

app.get("/blogs", (req, res) => {
  blogModel
    .find()
    .populate("author", ["username"])
    .sort({ createdAt: -1 })
    .limit(20)
    .then((response) => res.json(response));
});

app.get("/post/:id", (req, res) => {
  const { id } = req.params;
  blogModel
    .findById(id)
    .populate("author", ["username"])
    .then((response) => res.json(response))
});

app.put("/post/:id", uploadMiddleware.single("file"), (req, res) => {
  let newPath = null;
  const { token } = req.cookies;
  jwt.verify(token, key, {}, (err, info) => {
    if (err) throw err;
    const { id, title, content, summary } = req.body;
    if (req.file) {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      blogModel
        .findByIdAndUpdate(id, { title, summary, content, image: newPath })
        .then((response) => {
          res.json(response);
        });
    } else {
      blogModel.findById(id).then((response) => {
        newPath = response.image;
        blogModel
          .findByIdAndUpdate(id, { title, summary, content, image: newPath })
          .then((response) => {
            res.json(response);
          });
      });
    }
  });
});

app.listen(port, () => console.log("Server started at port " + port));
