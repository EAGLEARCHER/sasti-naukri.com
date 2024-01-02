const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log("req.headers", req.headers);
  console.log("authHeader", authHeader);
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authenticated Error");
  }
  const token = authHeader.split(" ")[1];
  try {console.log("asdas");
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", payload);
    console.log(22);
    req.user=({ userId: payload.userId, name: payload.name });

    console.log("req.user", req.user);
    next();
  } catch (error) {
    console.log(11);
    throw new UnauthenticatedError("Auth error");
  }
};

module.exports = auth;
