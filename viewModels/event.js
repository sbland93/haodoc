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
		highCategorys : event.highCategorys,
		middleCategorys : event.middleCategorys,
		lowCategorys : event.lowCategorys,
		eventRange: event.eventRange,
		hospitalName: event.hospitalName,
		subway: event.subway,
		address: event.address,

		views : event.views, //조회수
		payments : event.payments, //예약자수

	    realViews : event.realViews, //실 조회수
	    realPayments : event.realPayments, //실 결제수 

		thumbnailImage: event.thumbnailImage,
		eventImage: event.eventImage,
		updated_at: event.updated_at,
		
	};
};
