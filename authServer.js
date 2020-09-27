const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

const port = 3000;
app.use(express.json());

let refreshTokens = [];
//login using jwt
app.post("/login", (req, res) => {
  const user = {
    name: req.body.name,
  };
  const accessToken = jwt.sign(user, process.env.AUTH_SECRET_KEY, {
    expiresIn: "30s",
  });
  const refreshToken = jwt.sign(user, process.env.AUTH_REFRESH_KEY);
  refreshTokens.push(refreshToken);
  return res.status(200).json({
    accessToken: accessToken,
    refreshToken: refreshToken,
  });
});
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) {
    return res.status(401);
  }
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403);
  }
  jwt.verify(refreshToken, process.env.AUTH_REFRESH_KEY, (err, user) => {
    if (err) {
      return res.status(403);
    }
    const accessToken = jwt.sign(
      { name: user.name },
      process.env.AUTH_SECRET_KEY,
      { expiresIn: "30s" }
    );
    return res.status(200).json({
      accessToken: accessToken,
    });
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
