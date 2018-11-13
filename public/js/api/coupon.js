var baseCoupon = "/api/coupon";

var getCoupons = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCoupon,
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

var getCoupon = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCoupon + '/' + id,
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

var addCoupon = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCoupon,
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

var deleteCoupon = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCoupon + '/' + id,
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

//updateCoupon는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateCoupon = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCoupon + '/' + id,
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

