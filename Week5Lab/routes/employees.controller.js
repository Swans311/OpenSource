let Employee = require('./employees.model')
let debug = require('debug')('demo:review')

const sendJSONresponse = (res, status, content) =>{
    res.status(status)
    res.json(content)
}

module.exports.readEmployeesAll = (req,res)=>{
    ///debug('Getting all Emps')

    Employee.find().exec().then(results =>{
        sendJSONresponse(res, 200,results)
    }).catch(err => {
        sendJSONresponse(res, 404, err)
    })
}

module.exports.employeesReadOne = (req,res)=>{
    console.log("Searching for one")
    if(req.params && req.params._id){
        //debug("Getting a single review with id =", req.params._id)

        Employee.findById(req.params._id).exec().then(results =>{
            sendJSONresponse(res, 200,results)
        }).catch(err => {
            sendJSONresponse(res, 404,{
                "message":"Employee not found"
            })
        })
    }else{
        sendJSONresponse(res, 404,{
            "message":"Employee not found"
        })
    }   
}

module.exports.employeesCreate = (req,res)=>{
    debug('Creating Employee ', req.body)

    Employee.create({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        department:req.body.department,
        startDate:req.body.startDate,
        jobTitle:req.body.jobTitle,
        salary:req.body.salary
    }).then(dataSaved =>{
        //debug(dataSaved)
        sendJSONresponse(res, 201, dataSaved)
    }).catch(err =>{
        ///debug(err)
        sendJSONresponse(res, 404, err)
    })
}

module.exports.employeesUpdateOne = (req,res)=>{
    if(!req.params._id){
        sendJSONresponse(res, 404, {
            "message":"Not found... Employee Id required"
        })
        return
    }

    Employee.findById(req.params._id).exec()
    .then(employeeData =>{
        employeeData.firstName=req.body.firstName,
        employeeData.lastName=req.body.lastName,
        employeeData.department=req.body.department,
        employeeData.startDate=req.body.startDate,
        employeeData.jobTitle=req.body.jobTitle,
        employeeData.salary=req.body.salary
        return employeeData.save()
    }).then(data =>{
        sendJSONresponse(res,200,data)
    }).catch(err=>{
        sendJSONresponse(res, 400, err)
    })
}

module.exports.employeesDeleteOne = (req,res)=>{
    if(!req.params._id){
        sendJSONresponse(res, 404, {
            "message":"Not found... reviewid required"
        })
        return
    }

    Employee.findByIdAndRemove(req.params._id).exec()
    .then(employeeData =>{
       //debug("Emp ID " + req.params._id + " deleted")
       //debug(reviewData)
        sendJSONresponse(res,204, null)
    }).catch(err=>{
        sendJSONresponse(res, 400, err)
    })
}

module.exports.employeesSort = (req,res)=>{

    console.log("Sorting")
    if(req.params){

        Employee.find().sort([[req.params, 'descending']]).exec().then(results =>{
            sendJSONresponse(res, 200,results)
        }).catch(err => {
            sendJSONresponse(res, 404,{
                "message":"Employee not found"
            })
        })
    }else{
        sendJSONresponse(res, 404,{
            "message":"Employee not found"
        })
    }   
}

module.exports.getSomeStuff = (req,res)=>{
    console.log(req.params.column)
    if(req.params.column.toLowerCase()==="id"){
        if(req.params){
            console.log("finding id")
            //debug("Getting a single review with id =", req.params._id)
            console.log(req.body)
            Employee.findById(req.params.specific).exec().then(results =>{
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        }else{
            sendJSONresponse(res, 404,{
                "message":"Employee not found"
            })
        }  
    }
    else if(req.params.column.toLowerCase()==="sort"){
        if(req.params){

            Employee.find().sort([[req.params, 'descending']]).exec().then(results =>{
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        }else{
            sendJSONresponse(res, 404,{
                "message":"Employee not found"
            })
        }   
    }
    else{
        if(req.params){
            if(req.params.column.toLowerCase()==="firstname"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({firstName: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }
            else if(req.params.column.toLowerCase()==="lastname"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({lastName: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }
            else if(req.params.column.toLowerCase()==="department"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({department: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }
            else if(req.params.column.toLowerCase()==="jobtitle"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({jobTitle: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }
            else if(req.params.column.toLowerCase()==="salary"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({salary: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }
            else if(req.params.column.toLowerCase()==="startdate"){
                var spec = req.params.specific
                //console.log(column+" = " +spec)
                Employee.find({startDate: spec}).exec().then(results =>{
                    console.log(results)
                    sendJSONresponse(res, 200,results)
                }).catch(err => {
                    sendJSONresponse(res, 404,{
                        "message":"Employee not found"
                    })
                })
            
            }else{
                sendJSONresponse(res, 404,{
                    "message":"Invalid Column Name"
                })
            }
    
        }else{
            sendJSONresponse(res, 404,{
                "message":"Employee not found"
            })
        }   
    }
}


module.exports.employeesSpecific = (req,res)=>{
    console.log("Specific")
    //console.log(req.params.column)
    if(req.params){
        if(req.params.column.toLowerCase()==="firstname"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({firstName: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }
        else if(req.params.column.toLowerCase()==="lastname"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({lastName: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }
        else if(req.params.column.toLowerCase()==="department"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({department: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }
        else if(req.params.column.toLowerCase()==="jobtitle"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({jobTitle: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }
        else if(req.params.column.toLowerCase()==="salary"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({salary: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }
        else if(req.params.column.toLowerCase()==="startdate"){
            var spec = req.params.specific
            //console.log(column+" = " +spec)
            Employee.find({startDate: spec}).exec().then(results =>{
                console.log(results)
                sendJSONresponse(res, 200,results)
            }).catch(err => {
                sendJSONresponse(res, 404,{
                    "message":"Employee not found"
                })
            })
        
        }else{
            sendJSONresponse(res, 404,{
                "message":"Invalid Column Name"
            })
        }

    }else{
        sendJSONresponse(res, 404,{
            "message":"Employee not found"
        })
    }   
}