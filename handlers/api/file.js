var Files = require('../../models/coupon.js');
var fileViewModel = require('../../viewModels/file.js');

var fs = require('fs');
var path = require('path');
var util_server = require('../../util_server.js')();



//body 객체에 담아 보낼것들
//dir 해당 디렉토리의 별칭 [ "coupon", "event", "category" ] => [ "/coupon/all/", "/event/", "/category/all/" ]
//fileName => 해당 파일명.
//해당 directory 같은 경우는 util_server가 있는 파일 기준.
var dir_dictionary = {

	"coupon" : "/public/images/coupon/all",
	"event" : "/public/images/event/all",
	"category" : "/public/images/category/all",
	"banner" : "/public/images/banner/all"

};




module.exports = function(){

	return {
		
		//req.body.dir에 "coupon"을 담아서 보내면 "/coupon/all/"에 들어가서 모든파일들을 읽어서 보여준다.
		//req.body.dir에 "event"를 담아서 보내면 "/event/"
		getFiles: function(req, res, next){
			
			if(dir_dictionary[req.query.dir]){
				
				util_server.async_read_file(dir_dictionary[req.query.dir], function(error, fileList){
					if(error) return next(error);
					return res.json(fileList.map(fileViewModel));
				})


			}else{
				return next(new Error("NO DIR"));
			}

		},

		//req.body.dir에 "coupon"을 담아서 보내면 "/coupon/all/"에 들어가서 모든파일들을 읽어서 보여준다.
		//req.body.dir에 "event"를 담아서 보내면 "/event/"
		newFile: function(req, res, next){
			
			return res.json({success:true});
		
		},

		//req.body.dir에 "coupon"을 담아서 보내면 "/coupon/all/"에 들어가서 해당 파일을 삭제한다.
		//req.body.dir에 "event"를 담아서 보내면 "/event/"
		deleteFile: function(req, res, next){
			
			if(dir_dictionary[req.body.dir] && req.body.fileName){
				util_server.async_delete_file(dir_dictionary[req.body.dir], req.body.fileName, function(err){
					if (err) return next(new Error(err));
					else{
						return res.json({success: true});
					}
				})
			}else{
				return next(new Error("NO DIR"));
			}

		},


	}
}