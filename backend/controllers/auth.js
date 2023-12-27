const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  console.log("reached 1");
  console.log(req.body);
  const tempuser = {
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create(tempuser);

  console.log("reached 1");

  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login sucessfull....");
};

module.exports = { register, login };
