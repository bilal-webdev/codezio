const jwt = require("jsonwebtoken");
const { jwtSecretKey } = require("../../model/key").key;

exports.isLoggedIn = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).json({ error: "Access Denied" });

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    // console.log(verified);
    req.user = verified.user;
    next();
  } catch (error) {
    let message;
    if (!req.user) message = "Session Timeout, User not Found!!!";
    else message = error;
    // console.log(message);
    res.status(500).json({ error: message });
  }
};
