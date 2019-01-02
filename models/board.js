var mongoose = require('mongoose');


var boardSchema = mongoose.Schema({
    
    boardTitle: String,
    content : String,
    category : String,
    boardImages : [String],
    updated_at : { type: Date, default: Date.now },

});


var Board = mongoose.model('Board', boardSchema);

module.exports = Board;

