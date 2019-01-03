



module.exports = function(board){

	if(!board){
		return {
			success: false,
			message: 'No Data',
		};
	}
	
	return {
		success: true,
		id: board._id,
        boardTitle : board.boardTitle,
        content : board.content,
        category : board.category,
        views : board.views,
        comments : board.comments,
        updated_at : board.updated_at,
	};

};






