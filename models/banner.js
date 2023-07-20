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
    }
})

module.exports=mongoose.model('banner',bannerSchema)



