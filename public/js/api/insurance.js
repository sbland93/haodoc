var baseInsurance = "/api/insurance";

var getInsurances = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseInsurance,
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

var getInsurance = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseInsurance + '/' + id,
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

var addInsurance = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseInsurance,
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

var deleteInsurance = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseInsurance + '/' + id,
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

//updateInsurance는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateInsurance = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseInsurance + '/' + id,
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

