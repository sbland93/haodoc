var Subway = require('../../models/subway.js');
var subwayViewModel = require('../../viewModels/subway.js');
var subwayHandlers =require('../../handlers/api/subway.js')();


module.exports = function(app){

	app.get('/api/subway', subwayHandlers.getSubways);

	app.post('/api/subway', subwayHandlers.newSubway);

	app.get('/api/subway/:id', subwayHandlers.getSubway);

	app.delete('/api/subway/:id', subwayHandlers.deleteSubway);

	app.put('/api/subway/:id', subwayHandlers.updateSubway);

}