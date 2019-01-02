var baseFile = "/api/file";

var getFiles = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFile,
			method: 'GET',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};


var addFile = function(dir, data){

	//baseFile이 전역변수여서 건드리면 다음 액션에 영향을 끼침.
	//복사 후 바꿈.
	var newBase = baseFile;
	if(dir === "event") newBase += "/event";
	if(dir === "coupon") newBase += "/coupon";
	if(dir === "category") newBase += "/category";
	if(dir === "highCategory") newBase += "/highCategory";
	if(dir === "banner") newBase += "/banner";
	if(dir === "feed") newBase += "/feed";

	return new Promise(function(resolve, reject){

		$.ajax({

			url: newBase,
			method: 'POST',
			processData: false,
    		contentType: false,
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		
		});
	
	});
};


//data ( dir('coupon', 'event') / fileName)을 담아서 보낸다.
//서버에서는 해당하는 fileName을 dir에 찾아서 삭제한다.
//data를 담아서 보내기 위해 POST방식으로 보낸다. DELETE 방식에서는 data를 허용하지 않기 때문.
var deleteFile = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFile + '/delete',
			method: 'POST',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};



