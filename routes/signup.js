var express = require('express');
var router = express.Router();
let user  = require('../models/user') ;


/* GET home page. */
router.get('/', function(req, res, next) {
 let  isLoggedIn = req.session.userid ;
  if(isLoggedIn) {
  res.render('index', { accessWebsite: 'Sign Out',href:'signout' }) 
  return
  }
  else {
    res.render('signup',{accessWebsite:'Sign In',href:'signin'})
  }
});


router.post('/signingup',async(req,res)=>{
 let data = {
  fullName:req.body.fullname,
  grade:req.body.grade,
  password:req.body.password
} ;

let newUser = await new user({...data}) ;

await newUser.save().then(()=>{
  res.render('signin',{ accessWebsite: 'Sign In',href:'signin',successRegistrationMessage:'SignUp succesful, Sign In with your details',nn:false })
}).catch((e)=>{
  res.send(e)
})




})

module.exports = router; 
