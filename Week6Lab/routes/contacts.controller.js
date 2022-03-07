let Contact = require('./contacts.model')
//let debug = require('debug')('demo:review')

const sendJSONresponse = (res, status, content) =>{
    res.status(status)
    res.json(content)
}

module.exports.readContactsAll = (req,res)=>{
    ///debug('Getting all Emps')

    Contact.find().exec().then(results =>{
        sendJSONresponse(res, 200,results)
    }).catch(err => {
        sendJSONresponse(res, 404, err)
    })
}


module.exports.getNames = (req,res)=>{
    Contact.find({},{name:0,_id:0}).exec().then(results =>{
        sendJSONresponse(res, 200,results)
    }).catch(err => {
        sendJSONresponse(res, 404, err)
    })
}

module.exports.contactsReadOne = (req,res)=>{
    console.log("Searching for one")
    if(req.params && req.params._id){
        //debug("Getting a single review with id =", req.params._id)

        Contact.findById(req.params._id).exec().then(results =>{
            sendJSONresponse(res, 200,results)
        }).catch(err => {
            sendJSONresponse(res, 404,{
                "message":"Contact not found"
            })
        })
    }else{
        sendJSONresponse(res, 404,{
            "message":"Employee not found"
        })
    }   
}

module.exports.contactsCreate = (req,res)=>{
    //debug('Creating Employee ', req.body)
    console.log("Creating new contact info")
    Contact.create({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        number:req.body.number
    }).then(dataSaved =>{
        //debug(dataSaved)
        sendJSONresponse(res, 201, dataSaved)
    }).catch(err =>{
        ///debug(err)
        sendJSONresponse(res, 404, err)
    })
}

module.exports.ContactsUpdateOne = (req,res)=>{
    if(!req.params._id){
        sendJSONresponse(res, 404, {
            "message":"Not found... Employee Id required"
        })
        return
    }

    Contact.findById(req.params._id).exec()
    .then(contactData =>{
        contactData.name=req.body.name,
        contactData.phoneNumber=req.body.phoneNumber,
        contactData.phone=req.body.phone
        return contactData.save()
    }).then(data =>{
        sendJSONresponse(res,200,data)
    }).catch(err=>{
        sendJSONresponse(res, 400, err)
    })
}

module.exports.contactsDeleteOne = (req,res)=>{
    if(!req.params._id){
        sendJSONresponse(res, 404, {
            "message":"Not found... contactid required"
        })
        return
    }

    Contact.findByIdAndRemove(req.params._id).exec()
    .then(contactData =>{
       //debug("Emp ID " + req.params._id + " deleted")
       //debug(reviewData)
        sendJSONresponse(res,204, null)
    }).catch(err=>{
        sendJSONresponse(res, 400, err)
    })
}

module.exports.contactsSort = (req,res)=>{

    console.log("Sorting")
    if(req.params){

        Contact.find().sort([[req.params, 'descending']]).exec().then(results =>{
            sendJSONresponse(res, 200,results)
        }).catch(err => {
            sendJSONresponse(res, 404,{
                "message":"Contact not found"
            })
        })
    }else{
        sendJSONresponse(res, 404,{
            "message":"Contact not found"
        })
    }   
}
