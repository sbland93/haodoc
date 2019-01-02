




var couponReviewViewModel = require('../../viewModels/couponReview.js');
var couponReviewHandlers =require('../../handlers/api/couponReview.js')();




module.exports = function(app){



	app.get('/api/couponReview', couponReviewHandlers.getCouponReviews);

	app.post('/api/couponReview', couponReviewHandlers.newCouponReview);

	app.get('/api/couponReview/:id', couponReviewHandlers.getCouponReview);

	app.delete('/api/couponReview/:id', couponReviewHandlers.deleteCouponReview);

	app.put('/api/couponReview/:id', couponReviewHandlers.updateCouponReview);



}





