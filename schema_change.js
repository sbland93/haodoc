var credentials = require('./credentials.js');


//몽구스 설정.
var mongoose = require('mongoose');
var opts = {
	keepAlive: 1,
	useNewUrlParser: true
};
mongoose.Promise = global.Promise;


mongoose.connect(credentials.mongo.development.connectionString, opts);


var Hospital = require("./models/hospital.js");
var Hospital_Test = require('./models/hospital2.js');

var deepCopy = function(received_obj, throwing_obj, attribute_str){
	if(!throwing_obj[attribute_str]) return;
	received_obj[attribute_str] = throwing_obj[attribute_str];
}

var copy_string = [ "name", "city", "district", "address", "tel", "homepage", "subjects", "remarks", "hospitalID", 
	"xPos", "yPos", "monStart", "monClose", "tueStart", "tueClose", "wedStart", "wedClose", "thuStart", "thuClose", "friStart", "friClose",
	"satStart", "satClose", "sunStart", "sunClose", "holStart", "holClose", "reviews" ]

/*Hospital.find({}).exec(function(err, docs){
	//console.log(docs);

	var hospital_list = docs;
	var new_hospital_list = [];
	for (var i = hospital_list.length - 1; i >= 0; i--) {
		var newObj = {};
		if(hospital_list[i].xPos && hospital_list[i].yPos){
			console.log("here");
			newObj["location"] = {
				type: "Point",
				coordinates: [hospital_list[i].xPos, hospital_list[i].yPos],
			};
		}else{
			newObj["location"] = {
				type: "Point",
				coordinates: [ 0, 0 ],
			}
		}
		
		for (var k = 0; k < copy_string.length; k++) {
			deepCopy(newObj, hospital_list[i] ,copy_string[k]);
		}

		new_hospital_list.push(newObj);

	}
	//Hospital_Test.remove({}, function(err, docs){
		Hospital_Test.create(new_hospital_list, function(err, docs){
			console.log(docs);
			console.log(err);
		});
	//});

});*/


Hospital_Test.find({
	"location" : {
		"$near" : {
			"$geometry" : {
				type: "Point", coordinates: [126.937975, 37.555460]
			} 
		}
	}
}).limit(10).exec(function(err, docs){
	console.log(docs);
});








