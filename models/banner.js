const mongoose=require('mongoose')

const bannerSchema=new mongoose.Schema({
    heading:{
        type:String
    },
    subheading:{
        type:String
    },
    image:{
        type:String
    },
    blocked:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model('banner',bannerSchema)



