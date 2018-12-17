

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
var util_data_init = function(vue_self, which_func, data_name){
			
	which_func().then(function(_rtn){ 
		vue_self[data_name] = _rtn;
	}).catch(function(_rtn){
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
