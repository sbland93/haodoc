module.exports = function(recommend){
	if(!recommend){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: recommend._id,
		category : "recommend",
		symptom : recommend.symptom,
		subject : recommend.subject,
		position: recommend.position,
		reservation : recommend.reservation,
		day : recommend.day,
		remarks : recommend.remarks,
		wechatID : recommend.wechatID,
		name : recommend.name,
		password : recommend.password,
		public : recommend.public,
		answer : recommend.answer,
		updated_at : recommend.updated_at,
	};
};


