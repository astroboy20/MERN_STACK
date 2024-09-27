const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

//a static authentication method - sign up
userSchema.statics.signup = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  // Ensure the password is strong before hashing
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password not strong enough");
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email already in use");
  }

  //password, salt is the addition data added to the password before hashing
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  //save use
  const user = await this.create({ email, password: hash });

  return user;
};

//static authentication method - login
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Incorrect password");
  }

  return user;
};
module.exports = mongoose.model("User", userSchema);
