var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({

    content: String,
    updated_at : {type : Date, default: Date.now},

});


var accompanySchema = mongoose.Schema({
    
    symptom : String,
    subject : String,
    hospital : String,
    day : String,
    remarks: String,
    name: String, //닉네임
    wechatID: String,
    password: String, //비밀번호
    public : Boolean, // 공개 유무
    answer : {type: answerSchema},
    updated_at : {type : Date, default: Date.now},

});


var Accompany = mongoose.model('Accompany', accompanySchema);

module.exports = Accompany;




