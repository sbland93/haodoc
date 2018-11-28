var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({

    content: String,
    updated_at : {type : Date, default: Date.now},

});


var recommendSchema = mongoose.Schema({
    
    symptom : String,
    subject : String,
    position : String,
    reservation : String,
    day : String,
    remarks: String,
    wechatID: String,
    name: String, //닉네임
    password: String, //비밀번호
    public : Boolean, // 공개 유무
    answer : {type: answerSchema},
    updated_at : {type : Date, default: Date.now},

});


var Recommend = mongoose.model('Recommend', recommendSchema);

module.exports = Recommend;




