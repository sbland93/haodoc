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
		eventName: event.eventName,
		price : event.price,
		eventRange: event.eventRange,
		hospitalName: event.hospitalName,
		subway: event.subway,
		address: event.address,
		thumbnailImage: event.thumbnailImage,
		eventImage: event.eventImage,
		updated_at: event.updated_at,
		
	};
};
