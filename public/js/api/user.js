var baseUser = "/api/user";

var getUsers = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser,
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

var getUser = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser + '/' + id,
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

var addUser = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser,
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

var deleteUser = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser + '/' + id,
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

//updateUser는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateUser = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseUser,
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

