var credentials = require('./credentials.js');
var Participant = require('./models/participant.js'); 
var fs = require('fs');
var datass = require('./participant_data.js');


//몽구스 설정.
var mongoose = require('mongoose');
var opts = {
	keepAlive: 1,
	useNewUrlParser: true
};
mongoose.Promise = global.Promise;


mongoose.connect(credentials.mongo.development.connectionString, opts);


console.log(datass.length);


/*Participant.find().exec(function(err, participants){
	

	console.log(participants.length);

	var processed_data = JSON.stringify(participants);

	fs.writeFile('participant_data.js', processed_data, 'utf8', function(err) {
	   console.log('비동기적 파일 쓰기 완료');
	});


});*/

Participant.create(datass, function(err, rtn){
	console.log(rtn);
});




