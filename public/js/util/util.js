




//Vue.js 초기화 전용/ self.data_name = returnValue
var util_vue_init = function(vue_self, which_func, data_name){
			
	which_func().then(function(_rtn){
		vue_self[data_name] = _rtn;
	}).catch(function(_rtn){
		console.log(_rtn);
	});

}

var init_event = function(self){
	util_vue_init(self, getEvents, "events")
}

var init_coupon = function(self){
	util_vue_init(self, getCoupons, "coupons");
}

