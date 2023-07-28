const mongoose =require('mongoose')
const objectId=mongoose.Types.ObjectId  
const connectionSchema=new mongoose.Schema({
    connection:{
        user:{
            type:objectId,
            ref:"user",
            required:true
        },
        professional:{
            type:objectId,
             ref:"professionals",
             required:true
        }
    },
    lastmessage:{
        type:objectId,
        ref:""
    }
},{
    timestamps:true
})
module.exports=mongoose.model('connection',connectionSchema)