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
		price : event.price,
		categorys : event.categorys,
		eventRange: event.eventRange,
		hospitalName: event.hospitalName,
		subway: event.subway,
		address: event.address,
		thumbnailImage: event.thumbnailImage,
		eventImage: event.eventImage,
		updated_at: event.updated_at,
		
	};
};
