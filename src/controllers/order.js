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
       const orders = await Order.find({user}).populate("user","name");
       if(!orders){
        res.status(404).json({success:false,message:"orders not found"});
      }
       res.status(200).json({success:true,orders});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.allOrders = async(req,res)=>{
    try{
      const orders = await Order.find({}).populate("user","name");
      if(!orders){
        res.status(404).json({success:false,message:"orders not found"});
      }
      res.status(200).json({success:true,orders});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.getOrderById = async(req,res)=>{
    try{
     const orderId = req.params.id;
     const order = await Order.findById(orderId);
     if(!order){
        res.status(404).json({success:false,message:"order not found"});
     }
     res.status(200).json({success:true,order:order});
    }catch(err){
        res.status(500).json({success:false,message:err.message});
    }
};

exports.deleteOrderById = async(req,res)=>{
    try{
      const orderId = req.params.id;
      const  order = await Order.findByIdAndDelete(orderId);
      if(!order){
        res.status(404).json({success:false,message:"orders not found"});
      }
      res.status(200).json({success:true,message:"Order deleted successfully"});
    }catch(err){
        res.status(500).json({success:false,message:err.message}); 
    }
};

exports.processOrder = async(req,res)=>{
    try{
       const orderID = req.params.id;
       const order = await Order.findById(orderID);
       if(!order){
        res.status(404).json({success:true,message:"order not found"});
       }
       if(order.status=="Processing"){
        order.status = "Shipped";
       }else if(order.status=="Shipped"){
        order.status = "Delivered";
       }else{
        order.status = "Delivered";
       }
       await order.save();
       res.status(200).json({success:true,message:"Order Placed Successfully"});
    }catch(err){
        res.status(500).json({success:false,message:err.message}); 
    }
};