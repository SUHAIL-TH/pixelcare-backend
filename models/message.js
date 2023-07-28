const mongoose=require("mongoose")
const objectId=mongoose.Types.ObjectId 
const messageSchema=new mongoose.Schema({
    connectionid:{
        type:objectId,
        ref:"connection",
        required:true
    },
    from:{
        type:objectId,
        required:true
    },
    to:{
        type:objectId,
        required:true
    },
    message:{
        type:String,
        required:true

    }
},{
    timestamps:true
})