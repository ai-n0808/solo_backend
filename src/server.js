const express = require("express");

const app = express();

//Need get request
app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(8080, () => {
  console.log(`Server is running`);
});
