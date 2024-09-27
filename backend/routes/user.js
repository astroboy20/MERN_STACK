const express = require("express");
const {login_user, signup_user} = require("../controllers/userController")

const router = express.Router();

//login user
router.post("/login", login_user);

//sign-up user
router.post("/signup", signup_user);


module.exports = router