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
		isCoupon: true,
		couponName: coupon.couponName,
		originalPrice : coupon.originalPrice,
		price : coupon.price,
		isDeposit : coupon.isDeposit,
		deposit : coupon.deposit,
		highCategorys : coupon.highCategorys,
		middleCategorys : coupon.middleCategorys,
		lowCategorys : coupon.lowCategorys,
		remarks : coupon.remarks,
		questions : coupon.questions,
		couponRange: coupon.couponRange,
		hospitalName: coupon.hospitalName,
		subway: coupon.subway,

		views: coupon.views, // 조회수
		payments: coupon.payments, // 예약자수
		
	    realViews : coupon.realViews, //실 조회수
	    realPayments : coupon.realPayments, //실 결제수 

		address: coupon.address,
		thumbnailImage: coupon.thumbnailImage,
		password : coupon.password,
		couponImage: coupon.couponImage,
		updated_at: coupon.updated_at,

	};
};

