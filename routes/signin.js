var express = require('express');
var router = express.Router();
let user  = require('../models/user') ;


/* GET home page. */
router.get('/', function(req, res, next) {
 let  isLoggedIn = req.session.userid ;
  if(isLoggedIn) {
  res.render('index', { accessWebsite: 'Sign Out',href:'signout',nn:false }) 
  return
  }
  else {
    res.render('signin',{accessWebsite:'Sign In',href:'signin',successRegistrationMessage:false,nn:'You are not logged in'})
  }
});



router.post('/signingin',async(req,res)=>{

  let currentUser = req.body.fullname ;
  let currentUserPassword = req.body.password ;
 
  let findCurrentUser = await user.findOne({fullName:req.body.fullname}) ;
 console.log(findCurrentUser)
  if(findCurrentUser.password == currentUserPassword && findCurrentUser.fullName == currentUser)   {
      req.session.userid = currentUser ;

  res.render('configure',{configureMessage:false,accessWebsite:'Sign Out',href:'signout'})
   
  return
  
  }

  res.send('incorrect password or username')


})

module.exports = router; 
