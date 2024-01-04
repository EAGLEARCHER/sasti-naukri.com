const express = require("express");
const router = express.Router();
const {
  login,
  register,
  updateUser,
} = require("../controllers/auth-controller");

router.post("/register", register);
router.post("/login", login);
router.patch("/updateUser", updateUser);

module.exports = router;
