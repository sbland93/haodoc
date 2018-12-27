var mongoose = require('mongoose');


var eventSchema = mongoose.Schema({
    
    eventName: String,
    eventRange: String,
    categorys : { type : [ String ], default : [] },
    originalPrice : {type: Number, default: 0}, //원래가격
    price : {type: Number, default: 0},
    hospitalName: String,
    subway: String,
    address: String,
    thumbnailImage: String,
    eventImage: [ String ],
	updated_at : { type: Date, default: Date.now },

});


var Event = mongoose.model('Event', eventSchema);

module.exports = Event;




