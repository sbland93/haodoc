var baseCouponReview = "/api/couponReview";

var getCouponReviews = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCouponReview,
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

var getCouponReview = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCouponReview + '/' + id,
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

var addCouponReview = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCouponReview,
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

var deleteCouponReview = function(id){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCouponReview + '/' + id,
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

//updateCouponReview는 데이터만 보내서, ajax로 유저의 아이디를 체크한후, 그 유저아이디를 활용한다.
var updateCouponReview = function(id, data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseCouponReview + '/' + id,
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

