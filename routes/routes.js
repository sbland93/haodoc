
var homeHandlers = require('../handlers/home.js')();
var couponHandlers = require('../handlers/coupon.js')();
const hospitalHandlers = require('../handlers/hospital.js')();
const questionHandlers = require('../handlers/question.js')();
var mongoose = require('mongoose');

var checkID = function(req, res, next){

	if(!mongoose.Types.ObjectId.isValid(req.params.id)){
		next(new Error("NOT ID PATTERN"));
	}else{
		next();
	}

}

module.exports = function(app){




	app.get('/', function(req, res, next){
		res.render('renew/home/main/main', { layout: "renew/layout.handlebars" });
	});
	// app.get('/', homeHandlers.home);

	//home Handlers
	app.get('/about', homeHandlers.about);
	app.get('/admin', homeHandlers.admin);
	app.get('/team', homeHandlers.team);
	app.get('/rules', homeHandlers.rules);
	app.get('/personal', homeHandlers.personal);
	// app.get('/event', homeHandlers.events);
	app.get('/event', function(req, res, next){
		res.render('renew/home/event/event', { layout: "renew/layout.handlebars" });
	});
	app.get('/event/:id', checkID, function(req, res, next){
		res.render('renew/home/event/eventInfo', { layout: "renew/layout.handlebars" });
	});
	// app.get('/event/:id', homeHandlers.eventInfo);
	app.get('/coupon/:id', checkID, function(req, res, next){
		res.render('renew/home/coupon/couponInfo', { layout: "renew/layout.handlebars" });
	});
	// app.get('/coupon/:id', homeHandlers.couponInfo);


	//coupon Handlers
	app.get('/coupon0', couponHandlers.coupon0);
	app.get('/coupon0/:id', checkID, couponHandlers.coupon0);
	app.get('/coupon1', couponHandlers.coupon1);
	app.get('/coupon1/:id', checkID, couponHandlers.coupon1);
	app.get('/coupon2', couponHandlers.coupon2);
	app.get('/coupon2/:id', checkID, couponHandlers.coupon2);

	//For Development Handlers
	app.get('/find', hospitalHandlers.find);
	app.get('/subjectInfo', hospitalHandlers.subjectInfo);
	app.get('/hospital/:id', checkID, hospitalHandlers.info);

	//For Question Handlers

	app.get('/question', questionHandlers.question);
	app.get('/recommend', questionHandlers.recommend);
	app.get('/translate', questionHandlers.translate);
	app.get('/insurance', questionHandlers.insurance);
	app.get('/accompany', questionHandlers.accompany);

	app.get('/recommendInfo/:id',  checkID, questionHandlers.recommendInfo);
	app.get('/translateInfo/:id',  checkID, questionHandlers.translateInfo);
	app.get('/insuranceInfo/:id',  checkID, questionHandlers.insuranceInfo);
	app.get('/accompanyInfo/:id',  checkID, questionHandlers.accompanyInfo);

	//Renewal
	app.get('/renew', function(req, res, next){
		res.render('renew/main', {layout: false});
	});

	app.get('/renew/event', function(req, res, next){
		res.render('renew/event', {layout:false});
	});

	app.get('/test/renew', function(req, res, next){
		res.render('renew/home/main/main', { layout: "renew/layout.handlebars" });
	});

	app.get('/test/renew/event', function(req, res, next){
		res.render('renew/home/event/event', { layout: "renew/layout.handlebars" });
	});

	app.get('/test/renew/event/:id',  checkID, function(req, res, next){
		res.render('renew/home/event/eventInfo', { layout: "renew/layout.handlebars" });
	});

	app.get('/test/renew/coupon/:id',  checkID, function(req, res, next){
		res.render('renew/home/coupon/couponInfo', { layout: "renew/layout.handlebars" });
	});

	app.get('/term1', function(req, res, next){
		res.render('renew/home/other/term1', { layout: "renew/layout.handlebars" });
	});
	app.get('/term2', function(req, res, next){
		res.render('renew/home/other/term2', { layout: "renew/layout.handlebars" });
	});

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
	require('./api/category.js')(app);
	require('./api/banner.js')(app);



}