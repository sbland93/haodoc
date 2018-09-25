var mongoose = require('mongoose');

var hospitalSchema = mongoose.Schema({
	city: String,
	district: String,
	neighborhood: String, 
	subject: Array,
	name: String,
	category : String,
	tel : String,
	zipcode: String,
	address: String,
	weekday : String,
	saturday: String,
	holiday: String,
	review: String,
	subway : String,
	photo : {type: Number, default: 0}
});



var Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;