var mongoose = require('mongoose');



var highCategorySchema = mongoose.Schema({

    
    categoryName: String,
    iconImage : String,
    middleCategorys : [{
    	categoryName: String,
    	lowCategorys: [String],
    }],    
    
    updated_at : { type: Date, default: Date.now },


});




var HighCategory = mongoose.model('HighCategory', highCategorySchema);

module.exports = HighCategory;










