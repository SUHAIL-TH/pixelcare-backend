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
userRouter.post('/booking',userController.booking)
userRouter.get('/getbookingdatas',userController.getbookingdatas)

userRouter.post('/chatconnection/:professionalId',userController.chatconnection)
userRouter.get("/userchat",userController.userChats)
userRouter.get("/allmessage/:professionalId",userController.allmessages)
userRouter.post('/message',userController.addmessage)
// userRouter.post("/allmessages/:connectionid",userController.getallmessage)
userRouter.post("/addreview",userController.addreview)
userRouter.get('/getbanner',userController.getbanner)


module.exports = userRouter