const path = require('path')
var mainPage = (req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
}

module.exports = {
    mainPage
}