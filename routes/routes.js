
var homeHandlers = require('../handlers/home.js')();
var hpvHandlers = require('../handlers/hpv.js')();
const hospitalHandlers = require('../handlers/hospital.js')();
var Event = require("../models/event.js");


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
	app.get('/main2', homeHandlers.home2);
	app.get('/find', homeHandlers.find);

	app.get('/subjectInfo', hospitalHandlers.subjectInfo);
	app.get('/hospital/:id', hospitalHandlers.info);



	app.post('/testing', upload.any(), function(req, res, next){
		console.log(req.files);
		var newEventObject = req.body;
		newEventObject["eventImage"] = ["", "", ""];
		console.log(newEventObject);
		for (var i = req.files.length - 1; i >= 0; i--) {
			var thisFile = req.files[i];
			if(thisFile["fieldname"] == "thumbnailImage"){
				newEventObject["thumbnailImage"] = thisFile["filename"];
			}
			if(thisFile["fieldname"] == "eventImage1"){
				newEventObject["eventImage"][0] = thisFile["filename"];
			}
			if(thisFile["fieldname"] == "eventImage2"){
				newEventObject["eventImage"][1] = thisFile["filename"];
			}
			if(thisFile["fieldname"] == "eventImage3"){
				newEventObject["eventImage"][2] = thisFile["filename"];
			}
		}
		console.log(newEventObject);
		Event.create(newEventObject, function(req, res, next){
			console.log("here");
		});
	});


	require('./api/participant.js')(app);
	require('./api/payer.js')(app);
	require('./api/coupon.js')(app);
	require('./api/user.js')(app);
	require('./api/hospital.js')(app);
	require('./api/subway.js')(app);
	require('./api/event.js')(app);



}