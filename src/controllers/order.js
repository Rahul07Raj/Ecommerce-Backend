const Order = require("../models/order");
const { reduceStock } = require("../utils/feature");
exports.newOrder = async(req,res)=>{
    try{
        const{shippingInfo,orderItems,user,subtotal,tax,shippingCharges,discount,total} = req.body;
        if(!shippingInfo||!orderItems||!user||!subtotal||!tax||!shippingCharges||!discount||!total){
            res.status(400).json({success:false,message:"Please enter all field"});
        }
        const order = new Order({
            shippingInfo,
            orderItems,
            user,
            subtotal,
            tax,
            shippingCharges,
            discount,
            total
        });

        const newOrder = await Order.create(order);
        await reduceStock(orderItems);
        res.status(200).json({success:true,message:"Order Placed Successfully"});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.myOrders = async(req,res)=>{
    try{
       const {id:user} = req.query;
       const orders = await Order.find({user});
       res.status(200).json({success:true,orders});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
}