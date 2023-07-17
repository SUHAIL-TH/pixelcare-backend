const express=require("express")
const userRouter=express()
const userController=require("../controllers/userController")


userRouter.post("/signup",userController.postSignup)
userRouter.post("/postotp",userController.postotp)
userRouter.post("/postlogin",userController.postlogin)



module.exports=userRouter