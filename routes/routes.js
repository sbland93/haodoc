
var homeHandlers = require('../handlers/home.js')();


module.exports = function(app){

	app.get('/', homeHandlers.home);

	app.get('/about', homeHandlers.about);


	app.get('/hpv1', homeHandlers.hpv1);
	app.get('/hpv2', homeHandlers.hpv2);
	//관리자 페이지
	app.get('/admin', homeHandlers.admin);

	require('./api/user.js')(app);
	

}