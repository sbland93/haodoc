

var baseFile = "/api/file";

var getFiles = function(data){
	return new Promise(function(resolve, reject){
		$.ajax({
			url: baseFile,
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


//Vue.js 초기화 전용/ self.data_name = returnValue
var util_data_init = function(vue_self, which_func, data_name, cb){
	
	if(!cb){
		var cb = function(_rtn){ 
			vue_self[data_name] = _rtn;
		};	
	}
	which_func().then(cb).catch(function(_rtn){
		console.log(_rtn);
	});

}


var util_file_init = function(vue_self, dirString, data_name){

	getFiles({dir : dirString}).then(function(_rtn){
		vue_self[data_name] = _rtn;
	}).catch(function(_rtn){
		console.log(_rtn);
	});

}

//_arr을 넣으면, 시간순으로 정렬해주는 함수.
var util_sort_updated_at = function(_arr){
	
	return _arr.sort(function(a, b){
	    var a_time = new Date(a.updated_at).getTime();
	    var b_time = new Date(b.updated_at).getTime();
	    return b_time - a_time;
	});

};
