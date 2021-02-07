const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const register = require("./controllers/register");
const signin = require("./controllers/signin");

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
  res.json(database.users);
});

app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, knex, bcrypt);
});

app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  knex
    .select("*")
    .from("users")
    .where({ id: id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("not found such user");
      }
    })
    .catch((err) => res.status(400).json("error getting such user"));
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entry) => {
      res.json(entry[0]);
    })
    .catch((err) => res.status(400).json("unable to count entry"));
});

app.listen(3001, () => {
  console.log("I'm running well on 3001");
});
