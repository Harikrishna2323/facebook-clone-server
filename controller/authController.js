const { validateEmail, validateUserName } = require("../helpers/validation");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");

exports.register = async (req, res) => {
  try {
    console.log("req.body:  ", req.body);
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bDay,
      bMonth,
      bYear,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: "Invalid Email address.",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists with this email." });
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    const tempUserName = first_name + last_name;
    let newUserName = await validateUserName(tempUserName);

    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUserName,
      bDay,
      bMonth,
      bYear,
      gender,
    }).save();

    //for email verification
    const token = generateToken({ id: user._id }, "30m");

    res.status(201).json({
      message: "User Created",
      user,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        message: "This email address is not connected to an account.",
      });

    const compare = await bcrypt.compare(password, user.password);
    if (!compare) {
      return res.status(403).json({
        message: "Invalid credentials. Please try again.",
      });
    }

    //generate token
    const token = generateToken({ id: user._id }, "1d");
    res.status(200).json({
      message: "Login Successful",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
