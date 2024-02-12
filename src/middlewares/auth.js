const User = require("../models/user");


exports.isAdmin = async (req, res,next) => {
  try {
  const {id} =req.query;
//    if(!id){
//     return res.status(401).json({success:false,message:"Please login"});
//    }

   const user = await User.findById(id);
   if(!user){
    return res.status(401).json({success:false,message:"Not a valid user"});
   }

   if(user.role!=="admin"){
    return res.status(401).json({success:false,message:"Your not admin!! Only admin can"});
   }
  next();
  } catch (err) {
    res.status(500).json({success:false,message:err.message});
  }
};
