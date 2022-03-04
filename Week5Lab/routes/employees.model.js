const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    firstName:{
    type:String,
    required:false
    },
    lastName:{
        type:String,
        required:false
    },
    department:{
        type:String,
        required:false
    },
    startDate:{
        type:Date,
        required:false
    },
    jobTitle:{
        type:String,
        required:false
    },
    salary:{
        type:String,
        required:false
    }

})

let emp = mongoose.model('employees', employeeSchema)

module.exports = emp