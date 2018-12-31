var mongoose = require('mongoose');
var Category = require('./category.js')

var highCategorySchema = mongoose.Schema({

    
    categoryName: String,
    iconImage : String,
    middleCategorys : {
    	type: [{
	    	categoryName: String,
	    	lowCategorys: { type: [ {type: mongoose.Schema.Types.ObjectId, ref: 'Category'} ], default : []}
	    }],
	    default: [],
    },
    updated_at : { type: Date, default: Date.now },


});


var HighCategory = mongoose.model('HighCategory', highCategorySchema);

module.exports = HighCategory;


