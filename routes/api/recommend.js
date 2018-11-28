var recommendHandlers =require('../../handlers/api/recommend.js')();



module.exports = function(app){

	app.get('/api/recommend', recommendHandlers.getRecommends);

	app.post('/api/recommend', recommendHandlers.newRecommend);

	app.get('/api/recommend/:id', recommendHandlers.getRecommend);

	app.delete('/api/recommend/:id', recommendHandlers.deleteRecommend);

	app.put('/api/recommend/:id', recommendHandlers.updateRecommend);

}