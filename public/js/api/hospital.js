var baseHospital = "/api/hospital";

//coordinate근처의 병원들을 limitNum만큼 가져온다.
var getNearHospitals = function(coordinates, limitNum, subject){

	var data = {
		"coordinates" : coordinates,
		"limitNum" : limitNum,
	};
	console.log("here1", subject);

	if(subject){

		data["subject"] = subject;
		console.log("here", subject);
	}

	console.log(data);

	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + "/near",
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
}


var addPhotos = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + "/" + id + "/photo",
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
}

//photoName을 받아서 삭제하는 함수
var deletePhoto = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + "/" + id + "/photo",
			method: 'DELETE',
			data: data,
			success: function(rtnData){
				resolve(rtnData);
			},
			fail: function(rtnData){
				reject(rtnData);
			},
		});
	});
}

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
var updateHospital = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseHospital + '/' + id,
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

