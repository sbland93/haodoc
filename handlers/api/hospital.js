var Hospital = require('../../models/hospital2.js');
var hospitalViewModel = require('../../viewModels/hospital.js');
var fs = require('fs');
var path = require('path');


var deleteFile = function(base_path, file_name){
	var rtnPromise = new Promise(function(resolve, reject){
		console.log("here22");
		fs.unlink(path.join(__dirname + base_path) + file_name, function(err){
			console.log("err", err);
			if (err) reject(err);
			else{
				console.log(base_path+file_name+"is deleted");
				resolve();
			}
		});
	});
	return rtnPromise; 
}

module.exports = function(){
	return {
		//요청본문에 해당하는 Event를 새로 생성한다.
		//이벤트 생성을 위한 post에서는 이벤트이름과, 이벤트 기간, 병원 주소, 병원 이름, 지하철이 있어야 한다.
		addPhotos: function(req, res, next){
			var photos = [];
			
			for (var i = 0; i < req.files.length ; i++) {
				photos.push(req.files[i].filename);
			}

			Hospital.update({_id: req.params.id}, {"$push" : {"photos": photos}}, function(err, response){
				if(err) next(err);
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
			})
			
		},

		deletePhoto : function(req, res, next){

			console.log(req.body);
			if(req.body.photoName){
				deleteFile("../../../public/images/hospital/", req.body.photoName).then(function(){
					Hospital.update({_id: req.params.id}, {"$pull" : {"photos": req.body.photoName}}, function(err, response){
						if(err) next(err);
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
					})
				}).catch(function(err){
					res.json({success: false, message: err});
				});
			}

		},


		getNearHospitals: function(req, res, next){
			var data = req.body;
			console.log("data",  data);

			var base = {
				"location" : {
					"$near" : {
						"$geometry" : {
							"type": "Point", "coordinates": data.coordinates
						} 
					}
				}
			};
			if(data.subject){
				console.log("here");
				var query = {
					"$and" : [
						base,
						{ "subjects": data.subject }
					]
				}
			}else{
				var query = base;
			}

			console.log("query", query);
			Hospital.find(query).limit(Number(data.limitNum)).exec(function(err, hospitals){
				console.log("err", err);
				res.json(hospitals.map(hospitalViewModel));
			});


		},

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