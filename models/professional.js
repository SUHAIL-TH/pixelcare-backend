const mongoose=require("mongoose")

const professionalSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ownername:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    place:{
        type:String,
        require:true,

    },
    phone:{
        type:Number,
        required:true
    },
    blocked:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    booking:[
        {
            name:{
                type:String
            },
            place:{
                type:String
            },
            housename:{
                type:String
            },
            phone:{
                type:Number
            },
            date:{
                type:String,
            }

        }
    ],
    password:{
        type:String,
        required:true
    },
    certificate:{
        type:String,

    },
    photo:{
        type:String
    },
    profile:{
        type:String
    },
    verifeid:{
        type:Boolean,
        default:false
    }
})

module.exports=mongoose.model("professionals",professionalSchema)