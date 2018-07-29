
var homeHandlers = require('../handlers/home.js')();
var hpvHandlers = require('../handlers/hpv.js')();


module.exports = function(app){

	app.get('/', homeHandlers.home);

	//home Handlers
	app.get('/about', homeHandlers.about);
	app.get('/admin', homeHandlers.admin);
	app.get('/rules', homeHandlers.rules);
	app.get('/personal', homeHandlers.personal);

	//hpv Handlers
	app.get('/hpv0', hpvHandlers.hpv0);
	app.get('/hpv1', hpvHandlers.hpv1);
	app.get('/hpv2', hpvHandlers.hpv2);

	require('./api/user.js')(app);
	

}