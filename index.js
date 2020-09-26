const express = require("express");

require("dotenv").config();

const app = express();

const port = 8000;

const posts = [
  {
    name: "deepak",
    post: "I am Iron Man!!",
  },
  {
    name: "x",
    post: "Underoos!!",
  },
];

app.get("/posts", (req, res) => {
  return res.status(200).json(posts);
});

app.listen(port, () => {
  console.log("we are live on " + port);
});
