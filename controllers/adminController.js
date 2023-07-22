const Admin=require('../models/admin')
const User=require('../models/user')
const Banner=require('../models/banner')
const professional = require('../models/professional')



const postlogin=async(req,res)=>{
    adminexsist=await Admin.findOne({email:req.body.email})
    if(adminexsist){
        if(adminexsist.password==req.body.password){
            res.send({
                message:"success"
            })
        }else{
            res.status(400).json({message:"Invalid password"})
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
const getbanner=async(req,res)=>{
    try {
        let data=await Banner.find()
        res.status(200).json(data)
        
    } catch (error) {
        console.log(error)
    }

}
const blockbanner=async(req,res)=>{
    try {
        let id=req.params.id
        if(id){
            console.log("hiisfsgdkdj");
            await Banner.updateOne({_id:id},{$set:{blocked:true}})
            res.status(200).json({
                message:"success"
            })

        }else{
            res.status(400).json({
                message:"Somthing went wrong"
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
const unblockbanner=async(req,res)=>{
    try {
        let id=req.params.id
        if(id){
            console.log("hii");
            await Banner.updateOne({_id:id},{$set:{blocked:false}})
            res.status(200).json({
                message:"success"
            })

        }else{
            res.status(400).json({
                message:"Somthing went wrong"
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}
const getprofessionals=async(req,res)=>{
    try {
        let data=await professional.find({isVerified:false})
        
      
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
}
const getacceptedprofessionals=async(req,res)=>{
    try {
        let data=await professional.find({isVerified:true})
        
      
        return res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const acceptprofessional=async(req,res)=>{
    try {
        const id=req.params.id
        
       let data= await professional.updateOne({_id:id},{$set:{isVerified:true}})
       console.log(data);
       return res.json({
            data
        })
        
    } catch (error) {
        res.status(400).json({message:"Somthing went wrong"})
        console.log(error)
    }
}
const blockprofessional=async(req,res)=>{
    try {
        let id=req.params.id
        await professional.updateOne({_id:id},{$set:{blocked:true}})
        res.json({
            message:"success"
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"somthing went wrong"})
    }

}
const unblockprofessional=async(req,res)=>{
    try {
        let id=req.params.id
        await professional.updateOne({_id:id},{$set:{blocked:false}})
        res.json({
            message:"success"
        })
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:"somthing went wrong"})
    }

}

module.exports={
    postlogin,
    getusers,
    blockuser,
    unblockuser,
    addbanner,
    getbanner,
    blockbanner,
    unblockbanner,
    getprofessionals,
    acceptprofessional,
    blockprofessional,
    unblockprofessional,
    getacceptedprofessionals
}