var basePayer = "/api/payer";

var getPayers = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: basePayer,
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

var getPayer = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: basePayer + '/' + id,
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

var addPayer = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: basePayer,
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

var deletePayer = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: basePayer + '/' + id,
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

//updatePayer는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updatePayer = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: basePayer + '/' + id,
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

