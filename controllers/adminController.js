const Admin=require('../models/admin')
const User=require('../models/user')
const Banner=require('../models/banner')



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
const getusers=async(req,res)=>{
    try {
        let data=await User.find()
        console.log(data);
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
    }
}
const blockuser=async(req,res)=>{
    try {
        let id =req.params.id
        console.log(id);
        await User.updateOne({_id:id},{$set:{status:false}})
        res.json({message:"success"})
        // await 
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Somthing went wrong"})
    }
    
}
const unblockuser=async(req,res)=>{
    try {
        let id =req.params.id
        console.log(id);
        await User.updateOne({_id:id},{$set:{status:true}})
        res.json({message:"success"})
        // await 
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"Somthing went wrong"})
    }
    
}
const addbanner=async(req,res)=>{
    try {
        let data=req.body
        if(data){
            let result=new Banner({
                heading:data.heading,
                subheading:data.subheading,
                image:req.file.filename
            })
            await result.save()
            res.status(200).json({message:"Banner added successfully"})

        }else{
            res.status(200).json({
                message:"Somthing went wrong"
            })
        }
        
      
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    postlogin,
    getusers,
    blockuser,
    unblockuser,
    addbanner
}