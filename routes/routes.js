
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

	var renewLayout = { layout: "renew/layout.handlebars" };


	app.get('/', function(req, res, next){
		res.render('main/main', renewLayout);
	});

	//home Handlers
	app.get('/admin', homeHandlers.admin);
	app.get('/team', homeHandlers.team);

	app.get('/feed', function(req, res, next){
		res.render('feed/feed', renewLayout);
	});

	app.get('/event', function(req, res, next){
		res.render('event/list/event', renewLayout);
	});

	app.get('/event/:id', checkID, function(req, res, next){
		res.render('event/info/eventInfo', renewLayout);
	});

	app.get('/coupon/:id', checkID, function(req, res, next){
		res.render('coupon/info/couponInfo', renewLayout);
	});

	app.get('/test/board', function(req, res, next){
		res.render('board/list/board', renewLayout);
	});

	//coupon Handlers
	app.get('/coupon0', couponHandlers.coupon0);
	app.get('/coupon0/:id', checkID, couponHandlers.coupon0);
	app.get('/coupon1', couponHandlers.coupon1);
	app.get('/coupon1/:id', checkID, couponHandlers.coupon1);
	app.get('/coupon2', couponHandlers.coupon2);
	app.get('/coupon2/:id', checkID, couponHandlers.coupon2);

	app.get('/find', hospitalHandlers.find);
	app.get('/subjectInfo', hospitalHandlers.subjectInfo);
	app.get('/hospital/:id', checkID, hospitalHandlers.info);


	app.get('/term1', function(req, res, next){
		res.render('event/info/term/term1', renewLayout);
	});
	app.get('/term2', function(req, res, next){
		res.render('event/info/term/term2', renewLayout);
	});

	require('./api/participant.js')(app);
	require('./api/couponReview.js')(app);
	require('./api/payer.js')(app);
	require('./api/coupon.js')(app);
	require('./api/board.js')(app);
	require('./api/hospital.js')(app);
	require('./api/subway.js')(app);
	require('./api/event.js')(app);
	require('./api/feed.js')(app);
	require('./api/file.js')(app);
	require('./api/highCategory.js')(app);
	require('./api/category.js')(app);
	require('./api/banner.js')(app);



}