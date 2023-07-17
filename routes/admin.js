const express=require('express')
const adminRouter=express()
const adminController=require('../controllers/adminController')
adminRouter.post('/postlogin',adminController.postlogin)


module.exports=adminRouter