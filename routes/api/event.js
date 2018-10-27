var Event = require('../../models/event.js');
var eventViewModel = require('../../viewModels/event.js');
var eventHandlers =require('../../handlers/api/event.js')();


var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/event/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + file.originalname);
	},
});

var upload = multer({ storage: storage });




module.exports = function(app){

	app.get('/api/event', eventHandlers.getEvents);

	app.post('/api/event', upload.any(), eventHandlers.newEvent);

	app.get('/api/event/:id', eventHandlers.getEvent);

	app.delete('/api/event/:id', eventHandlers.deleteEvent);

	app.put('/api/event/:id', eventHandlers.updateEvent);

}