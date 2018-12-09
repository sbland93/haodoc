module.exports = function(file){
	if(!file){
		return {
			success: false,
			message: 'No Data',
		};
	}
	if(file === "base" || file === ".DS_Store"){
		return {
			fileName : undefined,
			success : true
		}
	}
	return {
		success: true,
		fileName : file,
		
	};
};
