var Hospital = require('../models/hospital.js');

module.exports = function(){
	
	return {
		
		info : function(req, res, next){

			Hospital.findById(req.params.id, function(err, hospital){
				if(err) return next(err);
				res.render("hospital/hospitalInfo", {
					hospital : hospital,
				});
			})
			
		},


		subjectInfo : function(req, res, next){

			res.render("hospital/subjectInfo");

		}
	}
	
}