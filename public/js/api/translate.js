var baseTranslate = "/api/translate";

var getTranslates = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseTranslate,
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

var getTranslate = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseTranslate + '/' + id,
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

var addTranslate = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseTranslate,
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

var deleteTranslate = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseTranslate + '/' + id,
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

//updateTranslate는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateTranslate = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseTranslate + '/' + id,
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

