
var homeHandlers = require('../handlers/home.js')();
var hpvHandlers = require('../handlers/hpv.js')();
const hospitalHandlers = require('../handlers/hospital.js')();
const questionHandlers = require('../handlers/question.js')();



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


	app.get('/coupon/:id', homeHandlers.couponInfo);


	//hpv Handlers
	app.get('/hpv0', hpvHandlers.hpv0);
	app.get('/hpv0/:id', hpvHandlers.hpv0);
	app.get('/hpv1', hpvHandlers.hpv1);
	app.get('/hpv1/:id', hpvHandlers.hpv1);
	app.get('/hpv2', hpvHandlers.hpv2);
	app.get('/hpv2/:id', hpvHandlers.hpv2);

	//For Development Handlers
	app.get('/find', hospitalHandlers.find);
	app.get('/subjectInfo', hospitalHandlers.subjectInfo);
	app.get('/hospital/:id', hospitalHandlers.info);

	//For Question Handlers

	app.get('/question', questionHandlers.question);
	app.get('/recommend', questionHandlers.recommend);
	app.get('/translate', questionHandlers.translate);
	app.get('/insurance', questionHandlers.insurance);
	app.get('/accompany', questionHandlers.accompany);

	app.get('/recommendInfo/:id', questionHandlers.recommendInfo);
	app.get('/translateInfo/:id', questionHandlers.translateInfo);
	app.get('/insuranceInfo/:id', questionHandlers.insuranceInfo);
	app.get('/accompanyInfo/:id', questionHandlers.accompanyInfo);



	require('./api/participant.js')(app);
	require('./api/couponReview.js')(app);
	require('./api/payer.js')(app);
	require('./api/coupon.js')(app);
	require('./api/user.js')(app);
	require('./api/hospital.js')(app);
	require('./api/subway.js')(app);
	require('./api/event.js')(app);
	require('./api/recommend.js')(app);
	require('./api/insurance.js')(app);
	require('./api/translate.js')(app);
	require('./api/accompany.js')(app);
	require('./api/file.js')(app);



}