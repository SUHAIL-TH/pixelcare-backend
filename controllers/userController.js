const User = require('../models/user')
const professional = require('../models/professional')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const randomString = require("randomstring")
const path = require('path');
const dotenv = require('dotenv');
const nodemailer = require("nodemailer");
const connection = require('../models/connection')
const message = require('../models/message')
const bookings = require('../models/booking')
const banner = require('../models/banner')
const contact = require('../models/contact')






dotenv.config()

// html: `<p>Hi ${name}, please click the link below and <a href="http://localhost:4200/resetsubmit?token=${token}&email=${email}">Reset</a> your password.</p>`
////nodemailer for reset password
const sendresetPasswordMail = async (name, email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "eshoes518@gmail.com",
                pass: process.env.PASS
            }
        })
        let mailOption = {
            from: "eshoes518@gmail.com",
            to: email,
            subject: "Link for reset password",
            html: `
              <div style="font-family: Arial, sans-serif; background-color: black; padding: 20px;">
                <p style="color: white; font-size: 16px; margin-bottom: 20px; font-weight-bold">
                  Hi ${name}, please click the button below to reset your password:
                </p>
                <a
                  href="http://localhost:4200/resetsubmit?token=${token}"
                  style="display: inline-block; background-color: #007bff; color: #fff; text-decoration: none; padding: 10px 20px; border-radius: 4px;"
                >
                  Reset Password
                </a>
              </div>
            `,
        };
        transporter.sendMail(mailOption, function (error, infor) {
            a
            if (error) {
                console.log(error);
            } else {
                console.log("mail has been send to the email");

            }
        })



    } catch (error) {
        console.log(error);

    }

}

//twilio  setup

const twilio = require("twilio")(process.env.accountsid, process.env.authtoken, {
    lazyLoading: true,
});







const postSignup = async (req, res) => {

    let email = req.body.email

    const emailexsist = await User.findOne({ email: email })
    if (emailexsist) {
        return res.status(400).send({
            message: "email already exsisted"
        })
    } else {
        let hashedpassword = await bcrypt.hash(req.body.password, 10)
        // const result = {
        //     name: req.body.name,
        //     email: req.body.email,
        //     phone: req.body.phone,
        //     password: hashedpassword
        // }
        // this is the code for save the user first if user enter the sign up button and later we want to verify using the otp
        const results = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpassword
        })



        await results.save()



        await twilio.verify.v2
            .services("VA4b9331e54c68f1726cd24a61b00d87f9")
            .verifications.create({
                to: "+91" + req.body.phone,
                channel: "sms",
            });



        res.json({
            data: results

        })
    }
}
const postotp = async (req, res) => {
    const otp = req.body.otp
    const result = await twilio.verify.v2
        .services("VA4b9331e54c68f1726cd24a61b00d87f9")
        .verificationChecks.create({
            to: "+91" + req.body.phone.phone,
            code: otp,
        });
    if (result.valid === true) {

        await User.updateOne({ email: req.body.phone.email }, { $set: { isverified: true } })
        // const user = new User({
        //     name: req.body.phone.name,
        //     email: req.body.phone.email,
        //     phone: req.body.phone.phone,
        //     password: req.body.phone.password
        // })
        // const result = await user.save()

        res.json({
            message: "verification is success"
        })

    } else {
        res.status(400).json({
            message: "verification failed"
        })
    }


}
const postlogin = async (req, res) => {

    let user = await User.findOne({ email: req.body.email })
    console.log(user);

    if (!user) {
        return res.status(400).send({
            message: "User not found"
        })
    }
    if (!(await bcrypt.compare(req.body.password, user.password))) {

        return res.status(400).send({ message: "Invalid Password" })
    } else {
        if (user.isverified) {
            if (user.status) {
                const { _id } = await user.toJSON();
                const token = jwt.sign({ _id: _id }, "secret")
                const result = await User.updateOne({ _id: user._id }, { $set: { jwttoken: token } })

                return res.json({
                    token: token,

                })

            } else {
                return res.status(400).json({ message: "Your are Blocked" })
            }

        } else {
            return res.status(400).json({
                message: "Your account is not verifid please verify it",
                phone: user.phone,
                email: user.email
            })
        }

    }

}

const resentotp = async (req, res) => {
    let data = req.body


    await twilio.verify.v2
        .services("VA4b9331e54c68f1726cd24a61b00d87f9")
        .verifications.create({
            to: "+91" + data.phone,
            channel: "sms",
        });



}
const verifynumber = async (req, res) => {
    try {
        const email = req.body.email
        const acname = await User.findOne({ email: email })
        console.log(acname);

        if (acname !== null) {
            console.log("hii");
            if (acname.status === true) {
                const randomstring = randomString.generate()

                const data = await User.updateOne({ email: email }, { $set: { token: randomstring } })
                sendresetPasswordMail(acname.name, acname.email, randomstring)
                res.send({ message: "hii" })
            } else {
                res.status(400).send({ message: "This email is blocked" })
            }




        } else {
            res.status(400).send({
                message: "Email is not found"
            })
        }

    } catch (error) {

        console.log(error)
    }


}
const resetpassword = async (req, res) => {
    console.log(req.body)
    try {
        let acname = await User.findOne({ token: req.body.token })

        if (acname) {
            let newpassword = await bcrypt.hash(req.body.password, 10)
            await User.updateOne({ _id: acname._id }, { $set: { password: newpassword } })

            res.send({ message: "success" })

        } else {
            res.status(400).send({ message: "Token has expired" })
        }
    } catch (error) {
        console.log(error)
    }
}
const getprofessionallist = async (req, res) => {
    try {
        let data = await professional.find({ isVerified: true, blocked: false })
        res.json(data)
    } catch (error) {
        console.log(error);
    }
}
const getprofessionaldata = async (req, res) => {
    try {
        let id = req.query.id
        let data = await professional.findOne({ _id: id }).populate("reviews.user")
        res.json(data)
    } catch (error) {
        console.log(error)
    }

}
const verifyaccount = async (req, res) => {
    try {
        let phone = req.query.phone
        await twilio.verify.v2
            .services("VA4b9331e54c68f1726cd24a61b00d87f9")
            .verifications.create({
                to: "+91" + phone,
                channel: "sms",
            });
    } catch (error) {
        console.log(error)
    }
}
const booking = async (req, res) => {
    try {

        const userId = req.userId;
        let result = new bookings({
            user: userId,
            name: req.body.name,
            housename: req.body.housename,
            place: req.body.place,
            event: req.body.event,
            date: req.body.date,
            phone: req.body.phone,
            professional: req.body.professional,
            amount: req.body.amount
        })
        await result.save()
        res.json({
            message: "sucess"
        })

    } catch (error) {
        console.log(error)
    }
}
const getbookingdatas = async (req, res) => {
    try {


        const userId = req.userId;
        let datas = await bookings.find({ user: userId, status: true }).populate("professional").sort({ createdAt: -1 })
        res.json(datas)


    } catch (error) {
        console.log(error)
    }
}
const chatconnection = async (req, res) => {
    try {

        const userId = req.userId;
        const connectionexsist = await connection.findOne({
            'connections.user': userId,
            'connections.professional': req.params.professionalId
        })
        if (connectionexsist) {

            res.json({ message: "success" })

        } else {
            let result = new connection({
                connections: {
                    user: userId,
                    professional: req.params.professionalId
                }
            })
            let data = await result.save()
            res.json(data)
        }

    } catch (error) {
        console.log(error)
    }
}
const userChats = async (req, res) => {
    try {
        const userId = req.userId
        const data = await connection.find({ 'connections.user': userId }).populate("connections.professional")
        res.json({ data: data, id: userId })
    } catch (error) {
        console.log(error)
    }
}
const allmessages = async (req, res) => {
    try {

        const userId = req.userId;
        const professionalId = req.params.professionalId;
        const data = await connection.findOne({
            'connections.user': userId,
            'connections.professional': professionalId
        });
        if (data) {
            const allMessages = await message.find({ connectionid: data._id }).sort('createdAt')

            res.json({
                result: allMessages,
                cid: data._id,
                userid: data.connections.user
            })
        } else {
            res.status(500).json({ message: "somthing went wrong" })
        }

    } catch (error) {
        console.log(error)
    }
}
const addmessage = async (req, res) => {

    try {
        const datas = req.body
        const result = new message({
            connectionid: datas.connectionid,
            from: datas.from,
            to: datas.to,
            message: datas.message
        })
        const data = await result.save()
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}


const addreview = async (req, res) => {
    try {

        const userId = req.userId;
        const data = req.body
        await professional.updateOne({ _id: data.profid }, { $push: { reviews: { review: data.review, user: userId, rating: data.rating, date: data.time } } })
        res.json({ message: "success" })



    } catch (error) {
        console.log(error)
    }
}
const getbanner = async (req, res) => {
    try {

        let data = await banner.find({ blocked: false })
        console.log(data);
        res.json(data)
    } catch (error) {
        console.log(error)
    }
}
const contactfrom = async (req, res) => {
    try {
        const id = req.userId
        data = req.body
        const result = new contact({
            user: id,
            name: data.name,
            email: data.email,
            phone: data.phone,
            message: data.message
        })
        await result.save()
        res.json({ message: "success" })


    } catch (error) {
        console.log(error)
    }
}
// const getallmessage = async (req, res) => {
//     try {
//         let id = req.params.connectionid
//         let data = await message.find({ connectionid: id }).sort('createdAt');
//         res.json(data)
//     } catch (error) {
//         console.log(error)
//     }
// }
module.exports = {
    postSignup,
    postotp,
    postlogin,
    resentotp,
    verifynumber,
    resetpassword,
    getprofessionallist,
    getprofessionaldata,
    verifyaccount,
    booking,
    getbookingdatas,
    chatconnection,
    userChats,
    allmessages,
    addmessage,
    addreview,
    getbanner,
    contactfrom
    // getallmessage
}