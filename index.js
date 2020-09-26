const express = require("express");

const jwt = require("jsonwebtoken");
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

app.get("/posts", authenticateToken, (req, res) => {
  return res.status(200).json({
    message: `wellcome ${req.user.name}`,
    posts: posts,
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401);
  }
  jwt.verify(token, process.env.AUTH_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json(err);
    }
    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log("we are live on " + port);
});
