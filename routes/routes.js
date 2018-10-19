
var homeHandlers = require('../handlers/home.js')();
var hpvHandlers = require('../handlers/hpv.js')();
const hospitalHandlers = require('../handlers/hospital.js')();

module.exports = function(app){

	app.get('/', homeHandlers.home);

	//home Handlers
	app.get('/about', homeHandlers.about);
	app.get('/admin', homeHandlers.admin);
	app.get('/team', homeHandlers.team);
	app.get('/rules', homeHandlers.rules);
	app.get('/personal', homeHandlers.personal);
	
	app.get('/event', homeHandlers.events);
	app.get('/event/:id', homeHandlers.eventInfo);

	//hpv Handlers
	app.get('/hpv0', hpvHandlers.hpv0);
	app.get('/hpv1', hpvHandlers.hpv1);
	app.get('/hpv2', hpvHandlers.hpv2);


	//For Development Handlers
	app.get('/main2', homeHandlers.home2);
	app.get('/find', homeHandlers.find);

	app.get('/subjectInfo', hospitalHandlers.subjectInfo);
	app.get('/hospital/:id', hospitalHandlers.info);






	require('./api/participant.js')(app);
	require('./api/user.js')(app);
	require('./api/hospital.js')(app);
	require('./api/subway.js')(app);
	require('./api/event.js')(app);



}