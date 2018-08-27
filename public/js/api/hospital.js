var baseHospital = "/api/hospital";

var getHospitals = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital,
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

var getHospital = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + '/' + id,
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

var addHospital = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital,
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

var deleteHospital = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + '/' + id,
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

//updateHospital는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateHospital = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital,
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

