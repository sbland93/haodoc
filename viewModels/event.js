module.exports = function(event){
	if(!event){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: event._id,
		isCoupon: false,
		eventName: event.eventName,
		originalPrice : event.originalPrice,
		price : event.price,
		highCategorys : coupon.highCategorys,
		middleCategorys : coupon.middleCategorys,
		lowCategorys : coupon.lowCategorys,
		eventRange: event.eventRange,
		hospitalName: event.hospitalName,
		subway: event.subway,
		address: event.address,
		views : coupon.views,
		thumbnailImage: event.thumbnailImage,
		eventImage: event.eventImage,
		updated_at: event.updated_at,
		
	};
};
