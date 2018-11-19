



module.exports = function(couponReview){
	if(!couponReview){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: couponReview._id,
		coupon : couponReview.coupon,
		name : couponReview.name,
		content: couponReview.content,
		score : couponReview.score,
		wechatID: couponReview.wechatID,
		password: couponReview.password,
		updated_at : couponReview.updated_at,

	};
};


