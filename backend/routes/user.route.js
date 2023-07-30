const express = require("express");

// controller functions
const {
  loginUser,
  signupUser,
  getUser,
  deleteUser,
  updateUser
} = require("../controllers/user.controller");

const router = express.Router();

// login route
router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post("/getuser", getUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;