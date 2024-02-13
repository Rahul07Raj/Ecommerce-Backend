const Order = require("../models/order");
exports.newOrder = async(req,res)=>{
    try{

    }catch(err){
        res.status(500).json({success:true,message:err.message});
    }
}