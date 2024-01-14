const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const {
  register,
  login,
  updateUser,
  deleteAccount,
  applyJob,
} = require("../controllers/user-controller");
const testUser = require("../middleware/testUser");

const rateLimiter = require("express-rate-limit");
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    msg: "Too many requests from this IP, please try again after 15 minutes",
  },
});

router.post("/auth/register", apiLimiter, register);
router.post("/auth/login", apiLimiter, login);
router.patch(
  "/update",
  // authenticateUser,
  //  testUser,
  updateUser
);
router.delete(
  "/deleteAccount",
  //  authenticateUser,
  deleteAccount
);
router.patch(
  "/job-application",
  // authenticateUser,
  applyJob
);
module.exports = router;
