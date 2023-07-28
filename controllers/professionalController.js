const professional = require('../models/professional')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const booking=require('../models/booking')
const postsignup = async (req, res) => {
    try {

        const imageFile = req.files['image'][0];
        const photoFile = req.files['photo'][0];


        let userexsist = await professional.findOne({ email: req.body.email })
        if (userexsist) {
            res.status(400).json({ message: "Email already taken" })
        } else {
            let hashpassword = await bcrypt.hash(req.body.password, 10)
            let result = new professional({
                name: req.body.name,
                ownername: req.body.ownername,
                phone: req.body.phone,
                email: req.body.email,
                password: hashpassword,
                place: req.body.place,
                certificate: imageFile.filename,
                photo: photoFile.filename
            })
            await result.save()
            res.status(200).json({
                message: "success"
            })

        }



    } catch (error) {
        console.log(error)
    }




}
const postlogin = async (req, res) => {
    try {
        let data = req.body
        console.log(data);
        let userData = await professional.findOne({ email: req.body.email })
        console.log(userData);
        if (userData) {

            if (!(await bcrypt.compare(req.body.password, userData.password))) {

                return res.status(400).send({ message: "Invalid user name or password" })
            } else {
                if (!userData.blocked) {
                    if (userData.isVerified) {
                        const { _id } = await userData.toJSON();
                        const token = jwt.sign({ _id: _id }, "secretprofessional",)


                        return res.json({
                            token: token,

                        })

                    } else {
                        return res.status(400).json({ message: "You are not Verified by admin" })
                    }

                } else {
                    return res.status(400).json({ message: "User is blocked" })
                }
            }

        } else {
            res.status(400).json({
                message: "user doesn't exsist"
            })
        }

    } catch (error) {
        console.log(error)
    }
}
const getprofileData = async (req, res) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, 'secretprofessional', async (err, decoded) => {
            if (err) {
              
                res.status(401).json({
                    auth: false,
                    status: "failed",
                    message: "Failed to authenticate",
                });
            } else {

                const userId = decoded._id;
                const username = decoded.iat;
                let data = await professional.findOne({ _id: userId })

                res.send(data)

            }

        });
    } catch (error) {
        console.log(error)
    }
}
const changeProfile = async (req, res) => {
    try {
        
        await professional.updateOne({ _id: req.body.ID }, { $set: { photo: req.file.filename } })
        res.json({ message: "success" })

    } catch (error) {

    }

}
const posteditprofile = async (req, res) => {
    try {
        
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, 'secretprofessional', async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    auth: false,
                    status: "failed",
                    message: "Failed to authenticate",
                });
            } else {

                const userId = decoded._id;
                console.log(userId);
                await professional.updateOne({ _id: userId }, { $set: { name: req.body.name, ownername: req.body.ownername, email: req.body.email, phone: req.body.phone, place: req.body.place, experinces: req.body.experinces, specialized: req.body.specialized } })

                res.json({message:"success"})

            }

        });


    } catch (error) {
        console.log(error)
    }
}
const addphotos=async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, 'secretprofessional', async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    auth: false,
                    status: "failed",
                    message: "Failed to authenticate",
                });
            } else {

                const userId = decoded._id;
                
                await professional.updateOne({ _id: userId }, { $push: {images:{image:req.file.filename,discription:req.body.discription}} })

                res.json({message:"success"})

            }

        });
        
    } catch (error) {
        console.log(error)
    }
}
const getbookingdata=async(req,res)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        jwt.verify(token, 'secretprofessional', async (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).json({
                    auth: false,
                    status: "failed",
                    message: "Failed to authenticate",
                });
            } else {

                const Id = decoded._id;
                
                const data=await booking.find({professional:Id}).populate('user')
                console.log(data)
                res.json(data)

            }

        });
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    postsignup,
    postlogin,
    getprofileData,
    changeProfile,
    posteditprofile,
    addphotos,
    getbookingdata

}