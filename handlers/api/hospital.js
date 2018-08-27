var Hospital = require('../../models/hospital.js');
var hospitalViewModel = require('../../viewModels/hospital.js');

module.exports = function(){
	return {

		getHospitals: function(req, res, next){
			Hospital.find(req.query)
			.exec(function(err, hospitals){
				if(err) return next(err);
				res.json(hospitals.map(hospitalViewModel));
			});
		},
		
		newHospital: function(req, res, next){
			if(req.body.name && req.body.subject){
				Hospital.create(req.body, function(err, hospital){
					if(err) return next(err);
					res.json({
						success: true,
						id: hospital._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'TITLE CONTENT REQUIRED',
				});
			}
		},
		
		getHospital: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Hospital.findById({_id: req.params.id}, function(err, hospital){
				if(err) console.error(err);
				if(!hospital){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(hospitalViewModel(hospital));
			});
		},
		
		deleteHospital: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Hospital.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		updateHospital: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Hospital.update({_id: req.params.id}, req.body ,function(err, response){
				if(err) console.error(err);
				if(response.nModified === 1){
					res.json({
						success: true,
						id: req.params.id,
					});
				} else {
					res.json({
						success: false,
						message: ''
					});
				}
			});
		},

	}
}