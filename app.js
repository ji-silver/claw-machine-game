const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "./game.html"));
});

app.listen(8080, () => {
  console.log("실행중");
});
