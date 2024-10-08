const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//token
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    //token
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  // res.status(200).json({ msg: "Login user" });
};

const signup_user = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);

    //token
    const token = createToken(user._id);
    res.status(201).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login_user,
  signup_user,
};
