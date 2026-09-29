const Users = require('../models/userModel');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ msg: "Authorization denied. No token provided." });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decoded) {
      return res.status(401).json({ msg: "Invalid Token. Authorization failed." });
    }

    const user = await Users.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ msg: "User does not exist." });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ msg: "Auth Error: " + err.message });
  }
};

module.exports = auth;
