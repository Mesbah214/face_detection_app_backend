const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "zero",
    password: "",
    database: "smart_brain",
  },
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("it is working");
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfileGet(req, res, knex);
});

app.put("/image", (req, res) => {
  image.handleImageCount(req, res, knex);
});

app.post("/imageurl", (req, res) => {
  image.handleApiCall(req, res, knex);
});

app.listen(process.env.PORT || 3001, () => {
  console.log(`I'm running well on ${process.env.PORT}`);
});
