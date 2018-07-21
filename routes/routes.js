
var homeHandlers = require('../handlers/home.js')();


module.exports = function(app){

	//home 페이지 라우팅. 홈에서는 로그인되어있다면 뉴스피드 화면, 로그인 되어있지 않다면 로그인화면을 보여준다.
	app.get('/', homeHandlers.home);

	app.get('/about', homeHandlers.about);


	app.get('/hpv1', homeHandlers.hpv1);
	app.get('/hpv2', homeHandlers.hpv2);

	require('./api/user.js')(app);
	

}