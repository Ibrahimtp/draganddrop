var express = require('express');
var router = express.Router();
let user = require('../models/user')


/* GET home page. */
router.get('/', async function(req, res, next) {


let allStudent = await user.find().populate('scores') ;

console.log(allStudent)


res.render('admin',{allStudent:allStudent}) ;




})


// router.post('/delete/:studentId',async ()=>{





// })

module.exports = router; 

