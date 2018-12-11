var baseCategory = "/api/category";

var getCategorys = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCategory,
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

var getCategory = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCategory + '/' + id,
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

var addCategory = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCategory,
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

var deleteCategory = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCategory + '/' + id,
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
var updateCategory = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCategory + '/' + id,
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

