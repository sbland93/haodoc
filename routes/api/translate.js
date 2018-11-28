var translateHandlers =require('../../handlers/api/translate.js')();



module.exports = function(app){

	app.get('/api/translate', translateHandlers.getTranslates);

	app.post('/api/translate', translateHandlers.newTranslate);

	app.get('/api/translate/:id', translateHandlers.getTranslate);

	app.delete('/api/translate/:id', translateHandlers.deleteTranslate);

	app.put('/api/translate/:id', translateHandlers.updateTranslate);

}