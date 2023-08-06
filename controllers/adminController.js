const Admin = require('../models/admin')
const User = require('../models/user')
const Banner = require('../models/banner')
const jwt = require('jsonwebtoken')
const professional = require('../models/professional')
const banner = require('../models/banner')
const booking = require('../models/booking')




const postlogin = async (req, res) => {
    adminexsist = await Admin.findOne({ email: req.body.email })
    if (adminexsist) {
        if (adminexsist.password == req.body.password) {
            const { _id } = await adminexsist.toJSON();
            const token = jwt.sign({ _id: _id }, "secretadmin",)
            res.json(token)
        } else {
            res.status(400).json({ message: "Invalid password" })
        }

    } else {
        res.status(400).send({
            message: "Invalid username or password"
        })
    }
}
const getusers = async (req, res) => {
    try {
        const data = await User.find()
        console.log(data);
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }
}
const blockuser = async (req, res) => {
    try {
        let id = req.params.id
        console.log(id);
        await User.updateOne({ _id: id }, { $set: { status: false } })
        res.json({ message: "success" })
        // await 

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Somthing went wrong" })
    }

}
const unblockuser = async (req, res) => {
    try {
        let id = req.params.id
        console.log(id);
        await User.updateOne({ _id: id }, { $set: { status: true } })
        res.json({ message: "success" })
       

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "Somthing went wrong" })
    }

}
const addbanner = async (req, res) => {
    try {
        let data = req.body
        if (data) {
            let result = new Banner({
                heading: data.heading,
                subheading: data.subheading,
                image: req.file.filename
            })
            await result.save()
            res.status(200).json({ message: "Banner added successfully" })

        } else {
            res.status(200).json({
                message: "Somthing went wrong"
            })
        }


    } catch (error) {
        console.log(error)
    }
}
const getbanner = async (req, res) => {
    try {
        let data = await Banner.find()
        res.status(200).json(data)

    } catch (error) {
        console.log(error)
    }

}
const blockbanner = async (req, res) => {
    try {
        let id = req.params.id
        if (id) {
            console.log("hiisfsgdkdj");
            await Banner.updateOne({ _id: id }, { $set: { blocked: true } })
            res.status(200).json({
                message: "success"
            })

        } else {
            res.status(400).json({
                message: "Somthing went wrong"
            })
        }

    } catch (error) {
        console.log(error)
    }
}
const unblockbanner = async (req, res) => {
    try {
        let id = req.params.id
        if (id) {
            console.log("hii");
            await Banner.updateOne({ _id: id }, { $set: { blocked: false } })
            res.status(200).json({
                message: "success"
            })

        } else {
            res.status(400).json({
                message: "Somthing went wrong"
            })
        }

    } catch (error) {
        console.log(error)
    }
}
const getprofessionals = async (req, res) => {
    try {
        let data = await professional.find({ isVerified: false })


        return res.json(data)
    } catch (error) {
        console.log(error)
    }
}
const getacceptedprofessionals = async (req, res) => {
    try {
        let data = await professional.find({ isVerified: true })


        return res.json(data)
    } catch (error) {
        console.log(error)
    }
}

const acceptprofessional = async (req, res) => {
    try {
        const id = req.params.id

        let data = await professional.updateOne({ _id: id }, { $set: { isVerified: true } })
        console.log(data);
        return res.json({
            data
        })

    } catch (error) {
        res.status(400).json({ message: "Somthing went wrong" })
        console.log(error)
    }
}
const blockprofessional = async (req, res) => {
    try {
        let id = req.params.id
        await professional.updateOne({ _id: id }, { $set: { blocked: true } })
        res.json({
            message: "success"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "somthing went wrong" })
    }

}
const unblockprofessional = async (req, res) => {
    try {
        let id = req.params.id
        await professional.updateOne({ _id: id }, { $set: { blocked: false } })
        res.json({
            message: "success"
        })

    } catch (error) {
        console.log(error)
        res.status(400).json({ message: "somthing went wrong" })
    }

}
const getdashboarddata=async(req,res)=>{
    try {
        const usercount=await User.find().count()
        const professionalverifiedcount=await professional.find({isVerified:true }).count()
        const professionalnotverifiedcount=await professional.find({isVerified:false }).count()
        const blockedprofessional=await professional.find({blocked:true }).count()
        const bannercount=await banner.find({blocked:false}).count()
        let bookedcount=await booking.find().count()
        const data={
            usercount:usercount,
            professionalnotverifiedcount:professionalnotverifiedcount,
            professionalverifiedcount:professionalverifiedcount,
            bannercount:bannercount,
            bookedcount:bookedcount,
            blockedprofessional:blockedprofessional
        }
       
        res.json(data)
      
    } catch (error) {
        console.log(error)
    }
}
const getbookingdata=async(req,res)=>{
    try {
        let bookingdata=await booking.find({status:true}).populate("professional").sort({createdAt:-1})
    
        res.json(bookingdata)
    } catch (error) {
        console.log(error)
        res.json(500).json({message:"servererror"})
    }
}

module.exports = {
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
    getacceptedprofessionals,
    getdashboarddata,
    getbookingdata

}