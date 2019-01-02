var baseParticipant = "/api/participant";

var getParticipants = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseParticipant,
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

var getParticipant = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseParticipant + '/' + id,
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

var addParticipant = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseParticipant,
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

var deleteParticipant = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseParticipant + '/' + id,
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

//updateParticipant는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateParticipant = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseParticipant + '/' + id,
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

