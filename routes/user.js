const express = require("express")
const userRouter = express()
const userController = require("../controllers/userController")


userRouter.post("/signup", userController.postSignup)
userRouter.post("/postotp", userController.postotp)
userRouter.post("/postlogin", userController.postlogin)
userRouter.post('/resentotp', userController.resentotp)
userRouter.post('/verifynumber', userController.verifynumber)
userRouter.post("/resetpassword", userController.resetpassword)
userRouter.get('/getprofessionallist', userController.getprofessionallist)
userRouter.get('/professionaldata', userController.getprofessionaldata)
userRouter.get('/verifyaccount',userController.verifyaccount)


module.exports = userRouter