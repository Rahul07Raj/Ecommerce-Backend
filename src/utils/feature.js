const Product = require("../models/product");

exports.reduceStock = async (orderItems) => {
    for(let i=0;i<orderItems.length;i++){
        const order = orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product){
            res.status(404).json({success:false,message:"Proudct not found"});
        }
        product.stock = order.quantity;
        await product.save();
    }
  };