var bannerHandlers =require('../../handlers/api/banner.js')();


var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/banner/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });



module.exports = function(app){

	app.get('/api/banner', bannerHandlers.getBanners);

	app.post('/api/banner', upload.any(), bannerHandlers.newBanner);

	app.get('/api/banner/:id', bannerHandlers.getBanner);

	app.delete('/api/banner/:id', bannerHandlers.deleteBanner);

	app.put('/api/banner/:id', bannerHandlers.updateBanner);

}