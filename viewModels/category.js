



var util_server = require('../util_server.js')();


module.exports = function(category){


	category.questions = util_server.map_make_html(category.questions, "content");
	category.questions = util_server.map_make_html(category.questions, "answer");
	category.caution_1 = util_server.map_make_html(category.caution_1, "content");
	category.caution_2 = util_server.map_make_html(category.caution_2, "content");
	category.content_1 = util_server.util_make_html(category.content_1);
	category.content_2 = util_server.util_make_html(category.content_2);

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
		content_1 : category.content_1,
		content_2 : category.content_2,
		questions: category.questions,
		caution_1: category.caution_1,
		caution_2: category.caution_2,
		updated_at : category.updated_at,
		remarks : category.remarks,
	};
};




