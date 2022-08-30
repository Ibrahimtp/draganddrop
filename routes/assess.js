var express = require('express');
var router = express.Router();
let studentScore = require('../models/studentScore')
let user = require('../models/user')



/* GET users listing. */
router.post('/',async function(req, res) {
  let  isLoggedIn = req.session.userid ;
  if(isLoggedIn) {
  let currentUser = await user.findOne({fullName:isLoggedIn})
    
    let newScore = {
      surat:req.body.range1,
      range:req.body.range2,
      score:req.body.score

    }
    let InsertNewScore = await  new studentScore(newScore)
    InsertNewScore.save()
console.log(currentUser)
    currentUser.scores = currentUser.scores.concat(InsertNewScore._id) ;
    
    currentUser.save() ;
/*
    currentUser.update({fullName:isLoggedIn},
      { "$push": { "scores": InsertNewScore._id } },
      { "new": true, "upsert": true },
      function (err, k) {
          if (err) {
              throw Error()
          }
        InsertNewScore.save()
          res.send('all ok')
      }
  );*/


  res.send('200')
    console.log(isLoggedIn)
    console.log(req.body.score) 
  }
    
  //res.render('configure',{configureMessage:false,accessWebsite: 'Sign Out',href:'signout'}); }
  
  else {
    res.render('signin',{configureMessage:false,accessWebsite: 'Sign In',href:'signin',NotLoggedMessage:'You have to be loggedIn before Submitting'}); 
  }
});



 
module.exports = router;

 
/*

Employeehierarchy.update(
    { "_id": employeeparent._id},
    { "$push": { "childrens": employee._id } },
    function (err, raw) {
        if (err) return handleError(err);
        console.log('The raw response from Mongo was ', raw);
    }
 );
*/