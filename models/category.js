var mongoose = require('mongoose');


//question에 대한 answer schema
var answerSchema = mongoose.Schema({

    name : String,
    content : String,
    password: String,
    updated_at : { type : Date, default : Date.now },

});

//question 스키마
var questionSchema = mongoose.Schema({

    name : String,
    wechatID : String,
    password : String,
    content : String,
    answer : { type: answerSchema },
    updated_at : { type: Date, default: Date.now },

});

var categorySchema = mongoose.Schema({
    
    categoryName: String,
    iconImage : String,
    content : String,
    questions : [ questionSchema ],
    updated_at : { type: Date, default: Date.now },

});




var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
