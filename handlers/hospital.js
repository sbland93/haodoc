var Hospital = require('../models/hospital.js');

module.exports = function(){
	
	return {
		
		info : function(req, res, next){
			res.render("hospital/hospitalInfo")			
		},

		subjectInfo : function(req, res, next){
			res.render("hospital/subjectInfo");
		},

		find : function(req, res, next){
			res.render('hospital/find');
		},

	}
	
}