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

//Show all of the games for user
app.get("/games", async (req, res) => {
  try {
    const allOfGames = await knex.select("*").from("games_table");
    res.status(200).json(allOfGames);
  } catch (error) {
    res.status(500).json({ error: "Failed fetch games" });
  }
});

// Mark a Game as Favorite
app.post("/favorites", async (req, res) => {
  console.log(req.body);
  const { user_id, game_id } = req.body;

  try {
    const [favoriteId] = await knex("favorites_table").insert(
      {
        user_id,
        game_id,
      },
      ["id"]
    );
    res.status(201).json({ message: "Added game to favorites", favoriteId });
  } catch (error) {
    res.status(500).json({ error: "Failed to add game to favorites" });
  }
});

//Get all favorite games for user
app.get("/favorites", async (req, res) => {
  console.log(req.query);
  const { user_id } = req.query;

  try {
    const favoriteGames = await knex("favorites_table")
      .join("games_table", "favorites_table.game_id", "=", "games_table.id")
      .where("favorites_table.user_id", user_id)
      .select(
        "games_table.id",
        "games_table.game_title",
        "favorites_table.id as favorite_id"
      );

    res.status(200).json(favoriteGames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorite games" });
  }
});

//Remove a Game from Favorites
app.delete("/favorites/:id", async (req, res) => {
  const favoriteID = req.params.id;
  console.log(favoriteID);

  try {
    const deletedRow = await knex("favorite_table")
      .where("id", favoriteID)
      .del();

    if (deletedRow) {
      res.status(200).json({ message: "Game removed successfully" });
    } else {
      res.status(404).json({ message: "Favorite not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove game from favorites" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
