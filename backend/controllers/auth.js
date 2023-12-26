const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  req.body = { ...req.body, password: hashedPassword };

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json(user);
};

const login = async (req, res) => {
  res.send("login sucessfull....");
};

module.exports = { register, login };
