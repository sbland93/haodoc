module.exports = function(participant){
	if(!participant){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {

		success: true,
		id: participant._id,
		participantName: participant.participantName,
		gender: participant.gender,
		eventName: participant.eventName,
		wechatID: participant.wechatID,
		memo: participant.memo,
		updated_at : participant.updated_at,		
	
	};
};