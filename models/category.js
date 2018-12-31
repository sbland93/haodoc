var mongoose = require('mongoose');


var categorySchema = mongoose.Schema({
    
    categoryName: String,
    iconImage : String,
    content_1 : String,
    content_2 : String,
    questions : [ { content: String, answer: String, updated_at: { type: Date, default: Date.now } } ],
    caution_1 : [ { content : String, updated_at: { type: Date, default: Date.now } } ],
    caution_2 : [ { day: String, content: String, updated_at: { type: Date, default: Date.now } }],
    updated_at : { type: Date, default: Date.now },
    remarks : String,

});


var Category = mongoose.model('Category', categorySchema);

module.exports = Category;


