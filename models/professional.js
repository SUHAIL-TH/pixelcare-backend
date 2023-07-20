const mongose=require("mongoose")

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
        type:number,
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
        tppe:String,
        required:true
    }
})

module.exports=mongoose.model("professionals",professionalSchema)