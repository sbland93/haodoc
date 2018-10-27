var baseEvent = "/api/event";

var getEvents = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseEvent,
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

var getEvent = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseEvent + '/' + id,
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

var addEvent = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseEvent,
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

var deleteEvent = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseEvent + '/' + id,
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

//updateEvent는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateEvent = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseEvent,
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

