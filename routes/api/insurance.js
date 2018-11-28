var insuranceHandlers =require('../../handlers/api/insurance.js')();



module.exports = function(app){

	app.get('/api/insurance', insuranceHandlers.getInsurances);

	app.post('/api/insurance', insuranceHandlers.newInsurance);

	app.get('/api/insurance/:id', insuranceHandlers.getInsurance);

	app.delete('/api/insurance/:id', insuranceHandlers.deleteInsurance);

	app.put('/api/insurance/:id', insuranceHandlers.updateInsurance);

}