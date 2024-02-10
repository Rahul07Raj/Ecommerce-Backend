const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  try {
    const { name, email, photo, gender } = req.body;

    if (!name || !email || !photo || !gender) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(422).json({ Error: "User already exist" });
    }
    const user = new User({
      name,
      email,
      photo,
      gender,
    });
    const newUser = await User.create(user);
    res.status(201).json({
      success: true,
      message: `User ${newUser.name} added successfully`,
      user: newUser,
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
    if(!updatedUser){
      return res.status(400).json({success:false,message:"user not found"});
    }
    res.status(200).json({ success: true, message: "User Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
