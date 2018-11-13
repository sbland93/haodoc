var mongoose = require('mongoose');


var reveiwSchema = mongoose.Schema({

	name: String, 


});


var Hospital = mongoose.model('Hospital', reveiwSchema);

module.exports = Hospital;




