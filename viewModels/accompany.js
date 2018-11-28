module.exports = function(accompany){
	if(!accompany){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: accompany._id,
        category : "accompany",
		symptom : accompany.symptom,
		subject : accompany.subject,
		hospital: accompany.hospital,
		day : accompany.day,
		remarks : accompany.remarks,
		wechatID : accompany.wechatID,
		name : accompany.name,
		password : accompany.password,
		public : accompany.public,
		answer : accompany.answer,
		updated_at : accompany.updated_at,
	};
};






