var Coupon = require('../../models/coupon.js');
var couponViewModel = require('../../viewModels/coupon.js');
var couponHandlers =require('../../handlers/api/coupon.js')();


var multer = require("multer");

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/images/coupon/all/');
	},
	filename: function(req, file, cb){
		cb(null, Date.now() + "_" + file.originalname);
	},
});

var upload = multer({ storage: storage });



module.exports = function(app){

	app.get('/api/coupon', couponHandlers.getCoupons);

	app.post('/api/coupon', upload.any(), couponHandlers.newCoupon);

	app.get('/api/coupon/:id', couponHandlers.getCoupon);

	app.delete('/api/coupon/:id', couponHandlers.deleteCoupon);

	app.put('/api/coupon/:id', couponHandlers.updateCoupon);

}