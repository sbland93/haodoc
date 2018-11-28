var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({

    content: String,
    updated_at : {type : Date, default: Date.now},

});


var insuranceSchema = mongoose.Schema({
    
    questionType : String,
    kindOfInsurance : String,
    school : String,
    whatInsurance : String,
    remarks: String,
    name: String, //닉네임
    wechatID: String,
    password: String, //비밀번호
    public : Boolean, // 공개 유무
    answer : {type: answerSchema},
    updated_at : {type : Date, default: Date.now},

});


var Insurance = mongoose.model('Insurance', insuranceSchema);

module.exports = Insurance;




