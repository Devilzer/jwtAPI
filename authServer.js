const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const port = 3000;
app.use(express.json());
app.post("/login", (req, res) => {
  const user = {
    name: req.body.name,
  };
  const token = jwt.sign(user, process.env.AUTH_SECRET_KEY);
  return res.status(200).json({
    authToken: token,
  });
});
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "auth server",
  });
});

app.listen(port, () => {
  console.log("AuthServer is live on " + port);
});
