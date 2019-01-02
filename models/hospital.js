var mongoose = require('mongoose');


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

	location:{
		type: {type: String},
		coordinates: [Number],
	},

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
	
	photos : {
		type: [String], default: []
	},

	reviews: {
		type: [reviewSchema], default: []
	},

	//상단 노출을 위한 키워드
	keywords : {
		type: [ String ], default: []
	},

	//상단 노출을 위한 점수
	score: {
		type : Number, default: 0,
	},

});


var Hospital2 = mongoose.model('Hospital2', hospitalSchema);

module.exports = Hospital2;




