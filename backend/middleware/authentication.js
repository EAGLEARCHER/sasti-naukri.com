const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Beared ")) {
    throw new UnauthenticatedError("Authenticated Error");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('payload',payload);
    req.user({ userId: payload.userId, name: payload.name });
    next();
  } catch (error) {
    throw new UnauthenticatedError("Auth error");
  }
};

module.exports = auth;