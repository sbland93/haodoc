


module.exports = function(translate){
    if(!translate){
        return {
            success: false,
            message: 'No Data',
        };
    }
    return {
        success: true,
        id: translate._id,
        category : "translate",
        agreement : translate.agreement,
        content : translate.content,
        remarks : translate.remarks,
        name : translate.name,
        wechatID : translate.wechatID,
        password : translate.password,
        public : translate.public,
        answer : translate.answer,
        updated_at : translate.updated_at,
    };
};




/*
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

*/
