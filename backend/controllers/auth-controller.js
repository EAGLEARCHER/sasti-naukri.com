const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      user: {
        userId: user._id, // Fix the reference to user._id instead of _id
        email: user.email,
        name: user.username,
        token,
      },
    });
  } catch (error) {
    // Handle specific error for duplicate email
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: `The email '${error.keyValue.email}' is already in use. Please choose another email.`,
      });
    }

    // Handle other errors
    console.error(error);
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Registration failed" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide credentials.....");
    }

    // Find the user with the provided email address
    const user = await User.findOne({ email });
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials...");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Invalid Password" });
      // throw new UnauthenticatedError("Invalid Password");
    }

    // Generate and assign a token to the user
    const token = await user.createJWT();

    res.status(StatusCodes.OK).json({
      user: {
        userId: user._id,
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.username,
        token,
      },
    });
  } catch (error) {
    // Send an appropriate response to the client when an error occurs
    if (
      error instanceof BadRequestError ||
      error instanceof UnauthenticatedError
    ) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: error.message });
    } else {
      console.error(error);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Internal Server Error" });
    }
  }
};
const updateUser = async (req, res) => {
  try {
    const { userId, email, name, lastName, location } = req.body;

    // Validation check for required fields
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError("Please provide all values");
    }

    const user = await User.findOne({ userId });
    // Update user information
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;

    // Save the updated user details
    await user.save();

    // Create a new JWT token after updating user details
    const token = user.createJWT();

    // Send the updated user details along with the new token in the response
    res.status(StatusCodes.OK).json({
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    // Handle errors if the user information cannot be updated
    console.error(error);
    if (error instanceof BadRequestError) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Unable to update user information" });
    }
  }
};

module.exports = { register, login, updateUser };
