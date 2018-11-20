module.exports = function(payer){
	if(!payer){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: payer._id,
		coupon : payer.coupon,
		payerName : payer.payerName,
		email: payer.email,
		englishName : payer.englishName,
		chineseName : payer.chineseName,
		phone : payer.phone,
		wechatID : payer.wechatID,
		birthDay : payer.birthDay,
		gender : payer.gender,
		payment : payer.payment,
		remarks : payer.remarks,
		updated_at : payer.updated_at,
	};
};


