const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (err) {
    res.status(400).json({ message: "INVALID TOKEN" });
  }
};
module.exports = auth;
