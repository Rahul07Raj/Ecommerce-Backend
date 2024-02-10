const mongoose = require("mongoose");

const connectDb= async()=>{
    try{
     const  conn = await mongoose.connect(process.env.MONGO_URL);
     console.log(`Database connection is true:${conn.connection.host}`);
    }catch(err){
        console.log(err);
    }
}
module.exports = connectDb;