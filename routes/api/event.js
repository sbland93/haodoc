var Event = require('../../models/event.js');
var eventViewModel = require('../../viewModels/event.js');
var eventHandlers =require('../../handlers/api/event.js')();


module.exports = function(app){

	app.get('/api/event', eventHandlers.getEvents);

	app.post('/api/event', eventHandlers.newEvent);

	app.get('/api/event/:id', eventHandlers.getEvent);

	app.delete('/api/event/:id', eventHandlers.deleteEvent);

	app.put('/api/event/:id', eventHandlers.updateEvent);

}