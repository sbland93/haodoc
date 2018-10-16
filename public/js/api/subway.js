var baseSubway = "/api/subway";

var getSubways = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSubway,
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

var getSubway = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSubway + '/' + id,
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

var addSubway = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSubway,
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

var deleteSubway = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSubway + '/' + id,
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

//updateSubway는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateSubway = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseSubway,
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

