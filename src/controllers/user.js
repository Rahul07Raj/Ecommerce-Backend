const User = require("../models/user");

exports.newUser = async (req, res, next) => {
    try{
     const{name,email,photo,role,gender} = req.body;
     const user = await User.create({});
     res.status(200).json({success:true,messagse:`Welcome ${user.name}`});
    }catch(err){

    }
};
