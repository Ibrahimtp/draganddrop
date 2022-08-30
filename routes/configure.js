var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  let  isLoggedIn = req.session.userid ;
  if(isLoggedIn) {
  res.render('configure',{configureMessage:false,accessWebsite: 'Sign Out',href:'signout'}); }
  
  else {
    res.render('configure',{configureMessage:false,accessWebsite: 'Sign In',href:'signin'}); 
  }
});



 
module.exports = router;
