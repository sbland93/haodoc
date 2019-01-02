var Hospital = require('../../models/hospital.js');
var hospitalViewModel = require('../../viewModels/hospital.js');
var hospitalHandlers =require('../../handlers/api/hospital.js')();


var multer = require("multer");

var storage_hospital = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/hospital/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + file.originalname);
	},
});

var upload_hospital = multer({ storage: storage_hospital });


module.exports = function(app){


	app.get('/api/hospital', hospitalHandlers.getHospitals);

	app.post('/api/hospital', hospitalHandlers.newHospital);

	app.post('/api/hospital/near', hospitalHandlers.getNearHospitals);
	//photo 추가
	app.post('/api/hospital/:id/photo',upload_hospital.any(), hospitalHandlers.addPhotos);

	app.delete('/api/hospital/:id/photo', hospitalHandlers.deletePhoto);
	
	app.get('/api/hospital/:id', hospitalHandlers.getHospital);

	app.delete('/api/hospital/:id', hospitalHandlers.deleteHospital);

	app.put('/api/hospital/:id', hospitalHandlers.updateHospital);

}