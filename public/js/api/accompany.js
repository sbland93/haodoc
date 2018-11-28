var baseAccompany = "/api/accompany";

var getAccompanys = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseAccompany,
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

var getAccompany = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseAccompany + '/' + id,
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

var addAccompany = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseAccompany,
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

var deleteAccompany = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseAccompany + '/' + id,
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

//updateAccompany는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateAccompany = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseAccompany + '/' + id,
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

