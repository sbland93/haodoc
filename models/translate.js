var mongoose = require('mongoose');

var answerSchema = mongoose.Schema({

    content: String,
    updated_at : {type : Date, default: Date.now},

});


var translateSchema = mongoose.Schema({
    
    agreement : Boolean,
    content : String,
    remarks: String,
    name: String, //닉네임
    wechatID: String,
    password: String, //비밀번호
    public : Boolean, // 공개 유무
    answer : {type: answerSchema},
    updated_at : {type : Date, default: Date.now},

});


var Translate = mongoose.model('Translate', translateSchema);

module.exports = Translate;




