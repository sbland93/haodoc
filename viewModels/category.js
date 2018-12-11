module.exports = function(category){
	if(!category){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: category._id,
        categoryName : category.categoryName,
		iconImage : category.iconImage,
		content : category.content,
		questions: category.questions,
		updated_at : category.updated_at,
	};
};



