



module.exports = function(banner){

	if(!banner){
		return {
			success: false,
			message: 'No Data',
		};
	}
	
	return {
		success: true,
		id: banner._id,
        bannerImage : banner.bannerImage,
        mobileImage : banner.mobileImage,
        category : banner.category,
        url : banner.url,
        remarks : banner.remarks,
        updated_at : banner.updated_at,
	};

};






