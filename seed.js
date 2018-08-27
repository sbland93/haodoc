
var Hospital = require('./models/hospital.js');
var seedData = require("./processed_data.js");


//Seed All Data From seedData.
var seedDev = function(){


	//Seeding Hospital Promise
	var seedHospital = new Promise(function(resolve, reject){
		Hospital.remove({}, function(err){
			Hospital.create(seedData, function(err, hospitals){
				if(err) reject(err);
				resolve(hospitals);
			});
		});
	});

	//Answer with Seed Hospital
	seedHospital.then(function(){
		console.log("Data initiating All, Success");
	})
	.catch(function(err){
		console.log("Data initiating All, Fail", err);
		throw new Error("Data initiating All, Fail");
	});

	
}

var seedTest = function(){

}


var seedProduction = function(){
	

}

//DOLATER process.env에 따른 데이터 변경. 

module.exports =  {
	development: seedDev,
	test: seedTest,
	production: seedProduction,
};


