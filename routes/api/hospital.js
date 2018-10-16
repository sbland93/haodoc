var Hospital = require('../../models/hospital.js');
var hospitalViewModel = require('../../viewModels/hospital.js');
var hospitalHandlers =require('../../handlers/api/hospital.js')();


module.exports = function(app){

	app.get('/api/hospital', hospitalHandlers.getHospitals);

	app.post('/api/hospital', hospitalHandlers.newHospital);

	app.post('/api/hospital/near', hospitalHandlers.getNearHospitals);

	app.get('/api/hospital/:id', hospitalHandlers.getHospital);

	app.delete('/api/hospital/:id', hospitalHandlers.deleteHospital);

	app.put('/api/hospital/:id', hospitalHandlers.updateHospital);

}