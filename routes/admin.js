var express = require('express');
var router = express.Router();
let user = require('../models/user')


/* GET home page. */
router.get('/', async function(req, res, next) {


let allStudent = await user.find().populate('scores') ;

console.log(allStudent)


res.render('admin',{allStudent:allStudent}) ;













//  let  isLoggedIn = req.session.userid ;
//   if(isLoggedIn) {
//   res.render('index', { accessWebsite: 'Sign Out',href:'signout' }) 
//   return
//   }
//   else {
//     res.render('index',{accessWebsite:'Sign In',href:'signin'})
//   }
});

module.exports = router; 

