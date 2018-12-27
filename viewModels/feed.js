module.exports = function(feed){
	if(!feed){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: feed._id,
		feedImage: feed.feedImage,
		mobileImage : feed.mobileImage,
		title : feed.title,
		content: feed.content,
		url: feed.url,
		hashtags: feed.hashtags,
		views: feed.views,
		remarks: feed.remarks,
		updated_at: feed.updated_at,
		
	};
};
