var baseBanner = "/api/banner";

var getBanners = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBanner,
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

var getBanner = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBanner + '/' + id,
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

var addBanner = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBanner,
			method: 'POST',
			data: data,
			processData: false,
    		contentType: false,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
};

var deleteBanner = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBanner + '/' + id,
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

//updateBanner는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateBanner = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseBanner + '/' + id,
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

