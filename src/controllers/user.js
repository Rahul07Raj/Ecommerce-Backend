const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: !email ? "email is required" : "password is required",
      });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({
        error: "Not Found",
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ error: "Unauthorized", message: "Invalid email or password" });
    } else {
      let token = await user.generateAuthToken();
      res.status(200).json({
        success: true,
        message: "login successfull",
        user,
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.registerUser = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !password || !mobile) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ message: "User already exist" });
    }
    const user = new User({
      name,
      email,
      mobile,
      password,
    });
    const newUser = await user.save();
    let token = await newUser.generateAuthToken();
    res.status(200).json({
      success: true,
      message: `User ${newUser.name} added successfully`,
      user: newUser,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, user: users });
  } catch (err) {
    res.status(500).json({ success: false, message: err });
  }
};

exports.getUserByID = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.findById({ _id });
    if (!user) {
      res.status(400).json({ success: true, message: "user not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteUserById = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedUser = await User.findByIdAndDelete({ _id });
    if (!updatedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "User Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
