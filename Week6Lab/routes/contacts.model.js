const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }

})

let emp = mongoose.model('contacts', contactSchema)

module.exports = emp