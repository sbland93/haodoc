var fileHandlers = require('../../handlers/api/file.js')();


var multer = require("multer");

var storage_event = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/event/all');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var storage_coupon = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/coupon/all');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var storage_category = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/category/all');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload_event = multer({ storage: storage_event });
var upload_coupon = multer({ storage : storage_coupon });
var upload_category = multer({ storage : storage_category });

module.exports = function(app){

	app.get('/api/file', fileHandlers.getFiles);


	app.post('/api/file/event', upload_event.any(), fileHandlers.newFile);

	app.post('/api/file/coupon', upload_coupon.any(), fileHandlers.newFile);

	app.post('/api/file/category', upload_category.any(), fileHandlers.newFile);

	//delete 방식으로는 data를 줄 수 없어서 post형식으로 만듬
	app.post('/api/file/delete', fileHandlers.deleteFile);



}