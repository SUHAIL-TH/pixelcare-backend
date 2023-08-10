const mongoose=require('mongoose')
const objectId=mongoose.Types.ObjectId
const contactSchema=new mongoose.Schema({
    user:{
        type:objectId,
        ref:'user',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=new mongoose.model('contact',contactSchema)
