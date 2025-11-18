const mongoose = require("mongoose");

module.exports.connect = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect database success");
    }
    catch(err){
        console.log("Connect database fail");
    }
}