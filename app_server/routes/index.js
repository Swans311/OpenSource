const express = require('express')
const bodyParser = require('body-parser')
const ctrlPages = require('../controllers/pages')
const { redirect } = require('express/lib/response')
const router = express.Router()

//router.get('/', ctrlPages.mainPage)
router.get('/form', (req, res)=>{
    res.render("home")
})

router.get('/404page', (req, res)=>{
    res.render("badPage")
})

router.post('/makeTable', bodyParser.urlencoded({extended:true}), (req, res)=>{
    //console.log("Working")
    //console.log(req.body)
    //res.render("badPage")
    res.render('tabel',{selectionNum:req.body.number})
})



module.exports = router