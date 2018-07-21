module.exports = function(user){
	if(!user){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: user._id,
		name: user.name,
		wechatID : user.wechatID,
		
	};
};
