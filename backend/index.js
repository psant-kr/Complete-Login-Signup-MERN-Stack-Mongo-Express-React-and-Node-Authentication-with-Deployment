const express = require("express");
const app = express();
require("dotenv").config();
require('./Models/db')

const PORT = process.env.PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("PONG.........");
});
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
