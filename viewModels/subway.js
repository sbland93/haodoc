module.exports = function(subway){
	if(!subway){
		return {
			success: false,
			message: 'No Data',
		};
	}
	return {
		success: true,
		id: subway._id,
		xPos: subway.xPos,
		yPos: subway.yPos,
		name: subway.name,
		chnName: subway.chnName,
		
	};
};
