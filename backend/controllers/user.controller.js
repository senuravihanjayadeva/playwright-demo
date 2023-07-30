const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup a user
const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, address, contactNumber } =
    req.body;

  try {
    const user = await User.signup(
      email,
      password,
      firstName,
      lastName,
      address,
      contactNumber
    );

    // create a token
    const token = createToken(user._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateUser = async (req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((existingUser) => {
      existingUser.firstName = req.body.firstName;
      existingUser.lastName = req.body.lastName;
      existingUser.address = req.body.address;
      existingUser.contactNumber = req.body.contactNumber;

      existingUser
        .save()
        .then((updatedUser) => res.json(updatedUser))
        .catch((error) => res.status(400).json("Error: " + error));
    })
    .catch((error) => res.status(400).json("Error: " + error));
};

const deleteUser = async (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((deletedUser) => {
      res.json(deletedUser);
    })
    .catch((error) => res.status(400).json("Error: " + error));
};

module.exports = {
  signupUser,
  loginUser,
  getUser,
  deleteUser,
  updateUser,
};