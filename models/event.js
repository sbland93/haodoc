var mongoose = require('mongoose');


var eventSchema = mongoose.Schema({
    
    eventName: String,
    eventRange: String,
    categorys : { type : [ String ], default : [] },
    originalPrice : {type: Number, default: 0}, //원래가격
    price : {type: Number, default: 0},

    highCategorys: { type: [ String ], default: []},
    middleCategorys: { type: [ String ], default: []},
    lowCategorys: { type: [ String ], default: []},
    
    hospitalName: String,
    subway: String,
    address: String,
    thumbnailImage: String,

    views : {type: Number, default: 0}, //조회수
    payments : {type: Number, default: 0}, //예약자수, 결제건수


    realViews : {type: Number, default: 0}, //실 조회수
    realPayments : {type: Number, default: 0}, //실 결제수 


    eventImage: [ String ],
	updated_at : { type: Date, default: Date.now },

});


var Event = mongoose.model('Event', eventSchema);

module.exports = Event;




