var mongoose = require('mongoose');


var boardSchema = mongoose.Schema({
    
    boardTitle: String,
    content : String,
    category : String,
    boardImages : [String],
    views : {type: Number, default: 0},
    updated_at : { type: Date, default: Date.now },
    comments: {
    	type : [{content: String, userID: String, updated_at: {type: Date, default: Date.now}}],
		default: []
	},

});


var Board = mongoose.model('Board', boardSchema);

module.exports = Board;

