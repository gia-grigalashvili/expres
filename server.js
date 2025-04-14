const express = require("express");
const app = express();
const port = 3001;

app.get("/", async (req, res) => {
  res.statusCode = 200;
  res.json({ message: "hello from express" });
});

module.exports = app;
