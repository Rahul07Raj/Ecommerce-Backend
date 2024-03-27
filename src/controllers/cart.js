const Cart = require('../models/cart');

exports.getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.findById({userId: req.user._id}).populate('productId')
    // console.log(carts)
    res.status(200).json({success: true, carts})
  } catch (err) {
    console.log(err)
    res.status(500).json({success: false, message:err.message})
  }
}

exports.addProductInCart = async (req, res) => {
  const {productId, count} = req.body
  try {
    const cart = await Cart.findOneAndUpdate(
      {productId},
      {productId, count, userId: req.user._id},
      {upsert: true},
    )

    res.status(200).json({success: true, message:"Product added suceessfully"})
  } catch (err) {
    console.log(err)
    res.status(500).json({success: false, message:err.message})
  }
}
exports.deleteProductInCart = async (req, res) => {
  try {
    await Cart.findByIdAndRemove(req.params.id)
    res.status(200).json({success: true, message:"Product Deleted from cart"})
  } catch (e) {
    console.log(err)
    res.status(500).json({success: false, message:err.message})
  }
}
// module.exports = {addProductInCart, deleteProductInCart, getCartProducts}