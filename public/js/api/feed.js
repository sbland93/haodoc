var baseFeed = "/api/feed";

var getFeeds = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFeed,
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

var getFeed = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFeed + '/' + id,
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

var addFeed = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFeed,
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

var deleteFeed = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFeed + '/' + id,
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

//updateFeed는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateFeed = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFeed + '/' + id,
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

