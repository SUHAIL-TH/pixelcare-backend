const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    isverified: {
        type: Boolean,
        default: false
    },
    jwttoken: {
        type: String
    },
    token: {
        type: String
    },
    
  

})

module.exports = mongoose.model('user', userSchema)