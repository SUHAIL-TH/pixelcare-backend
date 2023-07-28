const mongoose=require('mongoose')
const objectId=mongoose.Types.ObjectId  
const bookingSchema=new mongoose.Schema({
    user:{
        type:objectId,
        ref:'user',
        required:true
    },
    professional:{
        type:objectId,
        ref:'professionals',
        required:true
    },
    name:{
        type:String,
        required:true
    },
    housename:{
        type:String,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    event:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    status:{
        type:Boolean,
        default:true
    },
    amount:{
        type:Number,
        
    }
},{timestamps:true})

module.exports=mongoose.model('booking',bookingSchema)