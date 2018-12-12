
var fs = require('fs');
var path = require('path');


//NAME SPACE util haodoc.js에서 불러서 서버 전역에서 쓰임.


module.exports = function(){
	
	return {

		//content의 엔터를 유지해주기 위해, 파싱해주는 함수.

		util_make_html : function(target){

			return target.replace( /\r\n/g, "<br>" );

		},

		async_read_file : function(fileDir, cb){

			fs.readdir(path.join(__dirname + fileDir), cb);
		},

		async_delete_file : function(fileDir, fileName, cb){

			fs.unlink(path.join(__dirname + fileDir) +'/'+ fileName, cb);
		
		},

		deleteFiles : function(fileDir, file_name_arr, cb){

			var delete_promise_arr = [];

			for (var i = file_name_arr.length - 1; i >= 0; i--) {
				//하나의 transaction 단위로 묶어야 한다. 추가로, file 삭제 error 처리는 하지 않고 있다.
				//이미지 관리를 자율로 하기때문에 NODIR 에러가 빈번히 발생, 이를 막기 위함.
				var delete_prmoise = new Promise(function(resolve, reject){
					fs.unlink(path.join(__dirname + fileDir) + file_name_arr[i], (err) => {
						resolve();
					});
				});
				delete_promise_arr.push(delete_prmoise);
			}

			Promise.all(delete_promise_arr).then(cb);

		},


	}
}