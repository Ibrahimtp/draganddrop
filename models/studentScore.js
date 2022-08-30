let mongoose = require('mongoose') ;

let studentScoreSchema = mongoose.Schema({
    surat:{type:String},
    range:{type:String},
    score:{type:String}
})


module.exports = mongoose.model('studentScore',studentScoreSchema) 