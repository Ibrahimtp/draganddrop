let mongoose = require('mongoose') ;

let userSchema = mongoose.Schema({
    fullName:{type:String,unique:true},
    grade:{type:String},
    scores:[{type:mongoose.Schema.Types.ObjectId,ref:'studentScore'}],
    password:{type:String}
})


module.exports = mongoose.model('user',userSchema) ; 