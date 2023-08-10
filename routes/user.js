const express = require("express")
const userRouter = express()
const userController = require("../controllers/userController")
const authmiddlware=require('../middleware/auth')


userRouter.post("/signup", userController.postSignup)
userRouter.post("/postotp", userController.postotp)
userRouter.post("/postlogin", userController.postlogin)
userRouter.post('/resentotp', userController.resentotp)
userRouter.post('/verifynumber', userController.verifynumber)
userRouter.post("/resetpassword", userController.resetpassword)
userRouter.get('/getprofessionallist', userController.getprofessionallist)
userRouter.get('/professionaldata', userController.getprofessionaldata)
userRouter.get('/verifyaccount',userController.verifyaccount)
userRouter.post('/booking',authmiddlware,userController.booking)
userRouter.get('/getbookingdatas',authmiddlware,userController.getbookingdatas)

userRouter.post('/chatconnection/:professionalId',authmiddlware,userController.chatconnection)
userRouter.get("/userchat",authmiddlware,userController.userChats)
userRouter.get("/allmessage/:professionalId",authmiddlware,userController.allmessages)
userRouter.post('/message',userController.addmessage)
userRouter.post("/addreview",authmiddlware,userController.addreview)
userRouter.get('/getbanner',userController.getbanner)
userRouter.post('/contactform',authmiddlware,userController.contactfrom)
// userRouter.post("/allmessages/:connectionid",userController.getallmessage)


module.exports = userRouter