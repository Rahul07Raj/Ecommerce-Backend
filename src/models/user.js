const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: validator.default.isEmail,
    },
    mobile: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.JWT_KEY, {
      expiresIn: "2h",
    });
    await this.save();
    return token;
  } catch (err) {
    throw new Error(err);
  }
};
const User = mongoose.model("User", userSchema);
module.exports = User;

// userSchema.methods.generateAuthToken = async function () {
//   try {
//       let token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
//       await this.save();
//       return token;
//   } catch (error) {
//       throw new Error(error);
//   }
// };
