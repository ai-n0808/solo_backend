const express = require("express");
const knex = require("./knex");
const bcrypt = require("bcrypt");

const app = express();

//bcrypt
const saltRounds = 10;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
