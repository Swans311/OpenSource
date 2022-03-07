var express = require('express');
var router = express.Router();
var ctrlContacts = require('./contacts.controller')

//Routes
router.get('/contacts', ctrlContacts.readContactsAll)
router.get('/contacts', ctrlContacts.getNames)
router.post('/contacts', ctrlContacts.contactsCreate)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
