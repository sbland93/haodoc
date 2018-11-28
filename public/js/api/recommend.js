var baseRecommend = "/api/recommend";

var getRecommends = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseRecommend,
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

var getRecommend = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseRecommend + '/' + id,
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

var addRecommend = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseRecommend,
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

var deleteRecommend = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseRecommend + '/' + id,
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

//updateRecommend는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateRecommend = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseRecommend + '/' + id,
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

