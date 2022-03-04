var express = require('express');
var router = express.Router();
var ctrlEmployees = require('./employees.controller')

//Routes
router.get('/employees', ctrlEmployees.readEmployeesAll)
//router.get('/employees/:_id', ctrlEmployees.employeesReadOne)
//router.get('/employees/:sort', ctrlEmployees.employeesSort)
router.get('/employees/:column=:specific', ctrlEmployees.getSomeStuff)
router.post('/employees', ctrlEmployees.employeesCreate)
router.put('/employees/:_id', ctrlEmployees.employeesUpdateOne)
router.delete('/employees/:_id', ctrlEmployees.employeesDeleteOne)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
