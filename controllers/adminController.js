const Admin=require('../models/admin')



const postlogin=async(req,res)=>{
    adminexsist=await Admin.findOne({email:req.body.email})
    if(adminexsist){
        if(adminexsist.password==req.body.password){
            res.send({
                message:"success"
            })
        }

    }else{
        res.status(400).send({
            message:"Invalid username or password"
        })
    }
}

module.exports={
    postlogin
}