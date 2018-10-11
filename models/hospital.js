var mongoose = require('mongoose');

/*var hospitalSchema = mongoose.Schema({
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
});*/



//  var hospitalSchema = mongoose.Schema({


// 	name: String, 
// 	city: String,
// 	district : String,
// 	address : String,
// 	tel : String,
// 	category : String, //의원, 병원 등

// 	remarks: String,
// 	hpid: String,

// 	latitude: Number, //위도 경도
// 	longitude : Number,

// 	monStart: Number, //월~금 진료시간
// 	monClose: Number,
// 	tueStart: Number,
// 	tueClose: Number,
// 	wedStart: Number,
// 	wedClose: Number,
// 	thuStart: Number,
// 	thuClose: Number,
// 	friStart: Number,
// 	friClose: Number,
// 	satStart: Number,
// 	satClose: Number,
// 	sunStart: Number,
// 	sunClose: Number,
// 	holStart: Number,
// 	holClose: Number,

// });

var reviewSchema = mongoose.Schema({
	
	treatment: String, 
	content: String,
	star: Number,
	password: Number,
	updated_at : {type: Date, default: Date.now},

});


var hospitalSchema = mongoose.Schema({


	name: String, 
	city: String,
	district : String,
	address : String,
	tel : String,
	category : String, //의원, 병원 등
	homepage: String,
	subjects : Array,
	subway: String,

	remarks: String,
	hospitalID: String,

	xPos: Number, //위도 경도
	yPos : Number,

	monStart: String, //월~금 진료시간
	monClose: String,
	tueStart: String,
	tueClose: String,
	wedStart: String,
	wedClose: String,
	thuStart: String,
	thuClose: String,
	friStart: String,
	friClose: String,
	satStart: String,
	satClose: String,
	sunStart: String,
	sunClose: String,
	holStart: String,
	holClose: String,

	reviews: {
		type: [reviewSchema], default: []
	},

});


var Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;




