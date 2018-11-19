var mongoose = require('mongoose');
var Coupon = require('./coupon.js');


var couponReviewSchema = mongoose.Schema({
    
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'}, //쿠폰의 아이디를 저장한다.
    name: String,
    content: String,
    score: Number,
    wechatID: String,
    password: String,
	updated_at : { type: Date, default: Date.now },

});


var CouponReview = mongoose.model('CouponReview', couponReviewSchema);

module.exports = CouponReview;
