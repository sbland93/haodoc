var Participant = require('../../models/participant.js');
var participantViewModel = require('../../viewModels/participant.js');
var participantHandlers =require('../../handlers/api/participant.js')();


module.exports = function(app){

	app.get('/api/participant', participantHandlers.getParticipants);

	app.post('/api/participant', participantHandlers.newParticipant);

	app.get('/api/participant/:id', participantHandlers.getParticipant);

	app.delete('/api/participant/:id', participantHandlers.deleteParticipant);

	app.put('/api/participant/:id', participantHandlers.updateParticipant);

}