const User=require('../models/user')
const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken')
// const multer=require('multer')
const path = require('path');
const dotenv=require('dotenv');

dotenv.config()




const twilio = require("twilio")(process.env.accountsid, process.env.authtoken, {
    lazyLoading: true,
  });
  

const postSignup =async(req,res) => {
   
    let email=req.body.email
    
    const emailexsist=await User.findOne({email:email})
    if(emailexsist){
        return res.status(400).send({
            message:"email already exsisted"
        })
    }else{
        let hashedpassword=await bcrypt.hash(req.body.password,10)
        const result={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:hashedpassword
        }
        console.log(result);
        
        
        // const result=await user.save()
        // const {_id}=await result.toJSON();
        // const token=jwt.sign({_id:_id},"secret")


        await twilio.verify.v2
        .services("VA4b9331e54c68f1726cd24a61b00d87f9")
        .verifications.create({
          to: "+91" + req.body.phone,
          channel: "sms",
        });
        

        
        res.json({
            data:result

        })
        
    }

}
const postotp=async(req,res)=>{
    const otp=req.body.otp
   
    
    const result = await twilio.verify.v2
    .services("VA4b9331e54c68f1726cd24a61b00d87f9")
    .verificationChecks.create({
      to: "+91"+req.body.phone.phone,
      code: otp,
    });
    if(result.valid===true){
        const user=new User({
            name:req.body.phone.name,
            email:req.body.phone.email,
            phone:req.body.phone.phone,
            password:req.body.phone.password
        })
        const result= await user.save()
        res.send({
            message:"verification is success"
        })

    }else{
        res.send({
            message:"verification failed"
        })
    }
    
    
}
const postlogin=async(req,res)=>{
    let userData=req.body
    let user=await User.findOne({email:req.body.email})
    
    if(!user){
        res.status(400).send({
            message:"User not found"
        })
    }
    if(!(await bcrypt.compare(req.body.password,user.password))){
        console.log("hii password");
      return  res.status(400).send({message:"Invalid user name or password"})
    }
    res.send({
        message:"success"
    })
}

module.exports={
    postSignup,
    postotp,
    postlogin
}