var accompanyHandlers =require('../../handlers/api/accompany.js')();



module.exports = function(app){

	app.get('/api/accompany', accompanyHandlers.getAccompanys);

	app.post('/api/accompany', accompanyHandlers.newAccompany);

	app.get('/api/accompany/:id', accompanyHandlers.getAccompany);

	app.delete('/api/accompany/:id', accompanyHandlers.deleteAccompany);

	app.put('/api/accompany/:id', accompanyHandlers.updateAccompany);

}