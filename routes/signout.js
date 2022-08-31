var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
 let  isLoggedIn = req.session.userid ;
  if(isLoggedIn) {

    req.session.destroy();

    res.render('index',{accessWebsite:'Sign In',href:'signin'})


 
  return
  }
  else {
    res.render('index',{accessWebsite:'Sign In',href:'signin'})
  }
});

module.exports = router; 

