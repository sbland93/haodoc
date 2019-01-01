
var Hospital = require('./models/hospital.js');


//Seed All Data From seedData.
var seedDev = function(){

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


