module.exports = function(coupon){
	if(!coupon){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: coupon._id,
		couponName: coupon.couponName,
		price : coupon.price,
		questions : coupon.questions,
		couponRange: coupon.couponRange,
		hospitalName: coupon.hospitalName,
		subway: coupon.subway,
		address: coupon.address,
		thumbnailImage: coupon.thumbnailImage,
		password : coupon.password,
		couponImage: coupon.couponImage,
		updated_at: coupon.updated_at,

	};
};

