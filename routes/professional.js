const express = require("express")
const professionalRouter = express()
const professionalController = require("../controllers/professionalController")
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



professionalRouter.post("/postsignup", upload.fields([{ name: 'image' }, { name: 'photo' }]), professionalController.postsignup);
professionalRouter.post("/postlogin", professionalController.postlogin),
professionalRouter.get("/getprofileData",professionalController.getprofileData)
professionalRouter.post('/changeprofile',upload.single('profile'),professionalController.changeProfile)
professionalRouter.post('/posteditprofile',professionalController.posteditprofile)
professionalRouter.post('/postaddimage',upload.single('uploadimage'),professionalController.addphotos)
module.exports = professionalRouter