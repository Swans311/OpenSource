const mongoose = require('mongoose')
const debug = require('debug')('demo')
const dbURI = 'mongodb://localhost:27017/EmployeeEntry'

if(process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}

mongoose.connect(dbURI,{
    useNewUrlParser: true
})

mongoose.Promise = Promise

mongoose.connection.on('connected', ()=>{
    debug('Conected to ' + dbURI)
})

mongoose.connection.on('error', (err)=>{
    debug('Connected to ' + err)
    process.exit(0)
})

mongoose.connection.on('disconnected', ()=>{
    debug('Mongoose disconnected')
})

process.on('exit', code =>{
    debug('About to exit with code', code)
})