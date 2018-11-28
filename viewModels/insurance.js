

module.exports = function(insurance){
    if(!insurance){
        return {
            success: false,
            message: 'No Data',
        };
    }
    return {
        success: true,
        id: insurance._id,
        category : "insurance",
        questionType : insurance.questionType,
        kindOfInsurance : insurance.kindOfInsurance,
        school: insurance.school,
        whatInsurance : insurance.whatInsurance,
        remarks : insurance.remarks,
        wechatID : insurance.wechatID,
        name : insurance.name,
        password : insurance.password,
        public : insurance.public,
        answer : insurance.answer,
        updated_at : insurance.updated_at,
    };
};





