const User = require("../models/User-model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const userData = {
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  const user = await User.create({ ...userData });

  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: {
      id: user._id,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      id: user._id,
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequest("Please provide all values");
  }
  const user = await User.findOne({ _id: req.user.userId });

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
      token,
    },
  });
};

const deleteAccount = async (req, res) => {
  const deletedUser = await User.deleteOne({ _id: req.body.userId });
  if (deletedUser.deletedCount === 0) {
    throw new BadRequestError("User not Found");
  }
  res.status(StatusCodes.OK).json(deletedUser);
};

const applyJob = async (req, res) => {
  console.log("Job Applied..");
  return;
};
module.exports = {
  register,
  login,
  updateUser,
  deleteAccount,
  applyJob,
};
