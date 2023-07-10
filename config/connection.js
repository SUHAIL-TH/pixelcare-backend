const mongoose =require("mongoose")
const dotenv=require('dotenv')
dotenv.config()
module.exports={
    dbconnect:()=>{
        mongoose.connect(process.env.Mongo_url,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        }).then(()=>{
            console.log("server started to listening")
        }).catch((err)=>{
            console.log(err);
        })
    }
}