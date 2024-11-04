const express = require("express");
const knex = require("./knex");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());

//bcrypt
const saltRounds = 10;

app.post("/signup", async (req, res) => {
  try {
    const user_name = req.body.user_name;
    const plainPassword = req.body.password;

    //Hashing password
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    const addedUserId = await knex("users_table").insert(
      {
        user_name: user_name,
        password: hashedPassword,
      },
      ["id"]
    );
    res.status(201).json({ addedUserId });
  } catch (error) {
    res.status(500).json({ error: "Registration failed" });
  }
});

app.post("/login", async (req, res) => {
  const user_name = req.body.user_name;
  const plainPassword = req.body.password;

  try {
    let userInfo = await knex("users_table")
      .where({ user_name })
      .select("id", "user_name", "password");

    if (userInfo.length === 0) {
      return res.status(400).json({ error: "Incorrect username or password" });
    }

    const isMatch = await bcrypt.compare(plainPassword, userInfo[0].password);

    if (!isMatch)
      return res.status(400).json({ error: "Incorrect username or password" });
    const { id } = userInfo[0];
    return res.json({ id, user_name });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

app.get("/games", async (req, res) => {
  try {
    const allOfGames = await knex.select("*").from("games_table");
    res.status(200).json(allOfGames);
  } catch (error) {
    res.status(500).json({ error: "Failed fetch games" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
