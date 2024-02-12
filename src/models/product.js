const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name"],
    },
    photo: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "please enter price"],
    },
    stock: {
      type: Number,
      required: [true, "please enter stock"],
    },
    category: {
      type: String,
      required: [true, "please enter category"],
    },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
