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
app.get("/favorites/:user_id", async (req, res) => {
  const user_id = parseInt(req.params.user_id, 10);

  try {
    const favoriteGames = await knex("favorites_table")
      .rightJoin("games_table", "favorites_table.game_id", "games_table.id")
      .select("games_table.title")
      .where("favorites_table.user_id", user_id);
    res.status(200).json(favoriteGames);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch favorite games" });
  }
});

//Remove a Game from Favorites
app.delete("/favorites/:id", async (req, res) => {
  const favoriteID = parseInt(req.params.id, 10);

  try {
    const deletedRow = await knex("favorites_table")
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

//Add a Review and Rating for a Game
app.post("/reviews", async (req, res) => {
  const { user_id, game_id, rating, review, created_at } = req.body;
  console.log({ user_id, game_id, rating, review, created_at });

  try {
    await knex("reviews_table").insert({
      user_id: parseInt(user_id, 10),
      game_id: parseInt(game_id, 10),
      rating: parseInt(rating, 10),
      review: review,
      created_at: created_at,
    });

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Error Stack:", error.stack);
    res.status(500).json({ error: error });
  }
});

//Fetch All Reviews for a Particular Game
app.get("/reviews/:game_id", async (req, res) => {
  const game_id = parseInt(req.params.game_id, 10);

  try {
    const reviews = await knex("reviews_table")
      .where({ game_id })
      .select("user_id", "rating", "review");

    const averageRating = await knex("reviews_table")
      .where({ game_id })
      .avg("rating as avg_rating")
      .first();

    res.status(200).json({ reviews, averageRating: averageRating.avg_rating });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

//Delete a Review
app.delete("/reviews/:id", async (req, res) => {
  const reviewId = parseInt(req.params.id, 10);

  try {
    const deletedRow = await knex("reviews_table").where("id", reviewId).del();

    if (deletedRow) {
      res.status(200).json({ message: "Review deleted successfully" });
    } else {
      res.status(404).json({ error: "Review not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running`);
});
