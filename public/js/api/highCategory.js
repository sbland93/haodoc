var highCategory = "/api/highCategory";

var getHighCategorys = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: highCategory,
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

var getHighCategory = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: highCategory + '/' + id,
			method: 'GET',
			success: function(rtnData){
				resolve(rtnData);
			}, 
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var addHighCategory = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: highCategory,
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

var deleteHighCategory = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: highCategory + '/' + id,
			method: 'DELETE',
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

//updateCategory는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateHighCategory = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: highCategory + '/' + id,
			method: 'PUT',
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

