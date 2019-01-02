var mongoose = require('mongoose');

var subwaySchema = mongoose.Schema({
	xPos: Number,
	yPos: Number,
	chnName: String, 
	name: String,
});


var Subway = mongoose.model('Subway', subwaySchema);
module.exports = Subway;