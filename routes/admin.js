const express = require('express')
const adminRouter = express()
const adminController = require('../controllers/adminController')
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: function (req, file, cb) {
        const name = Date.now() + '-' + file.originalname
        cb(null, name)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/png' ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/webp"
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("only .png,.jpg,.jpeg,.webp formalt is allowed"));
        }
    },
});

adminRouter.post('/postlogin', adminController.postlogin)
adminRouter.get('/getusers', adminController.getusers)
adminRouter.post("/blockuser/:id", adminController.blockuser)
adminRouter.post("/unblockuser/:id", adminController.unblockuser)
adminRouter.post('/addbanner', upload.single('image'), adminController.addbanner)
adminRouter.get("/getbanner", adminController.getbanner)
adminRouter.post('/blockbanner/:id', adminController.blockbanner)
adminRouter.post("/unblockbanner/:id", adminController.unblockbanner)
adminRouter.get('/getprofessionals', adminController.getprofessionals)
adminRouter.post('/acceptprofessional/:id', adminController.acceptprofessional)
adminRouter.get('/getacceptedprofessionals', adminController.getacceptedprofessionals)
adminRouter.post('/blockprofessional/:id', adminController.blockprofessional)
adminRouter.post('/unblockprofessional/:id', adminController.unblockprofessional)
adminRouter.get('/dashboarddata',adminController.getdashboarddata)
adminRouter.get('/bookingdata',adminController.getbookingdata)
adminRouter.get('/contacteddata',adminController.getcontacteddata)

module.exports = adminRouter