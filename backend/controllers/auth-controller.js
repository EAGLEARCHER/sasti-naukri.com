const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Email already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({
      username: name,
      email,
      password: hashedPassword,
    });

    console.log(newUser);
    res.status(StatusCodes.CREATED).json(newUser);
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error creating user:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Could not register user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the provided email address
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid credentials.....", user: req.body });
      throw new BadRequestError("Invalid credentials");
    }
  } catch {}
  res.send("Login successful");
};

module.exports = { register, login };
