var HighCategory = require('../../models/highCategory.js');
var highCategoryViewModel = require('../../viewModels/highCategory.js');

module.exports = function(){
	return {
		
		getHighCategorys: function(req, res, next){
			HighCategory.find(req.query).sort({updated_at:'-1'}).populate("middleCategorys.lowCategorys")
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(highCategoryViewModel));
			});
		},
		
		//요청본문에 해당하는 category를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newHighCategory: function(req, res, next){

			if(req.body.categoryName){
				//iconImage 하나밖에 없음
				var thisFile = req.files[0];
				req.body["iconImage"] = thisFile["filename"];
				HighCategory.create(req.body, function(err, category){
					if(err) return next(err);
					res.json({
						success: true,
						id: category._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		
		},
		
		//해당 id의 highCategory를 available상태로 만들고 응답은 success를 담아준다.
		getHighCategory: function(req, res, next){
			
			if(!req.params.id) return next('No Id');
			HighCategory.findById({_id: req.params.id}, function(err, highCategory){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!highCategory){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(highCategoryViewModel(highCategory));
			});
		
		},
		
		//id에 해당하는 highCategory를 삭제한다.
		deleteHighCategory: function(req, res, next){
			if(!req.params.id) return next('No Id');
			var highCategory_dir = "/public/images/category/highCategory/all"
			HighCategory.findById({_id: req.params.id}, function(err, highCategory){
				if(err) return console.error(err);
				/*DOLATER err 처리 */
				if(!highCategory){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				util_server.async_delete_file(highCategory_dir, highCategory.iconImage, function(err){
					//파일처리에서 일부러 error 처리를 현재 하지 않는 중, 이미지 관리를 자유로 하고있기 때문에 , no dir error 빈번하게 발생.
					highCategory.remove(function(err){
						if(err) return next("Not Deleted");
						return res.json({success: true});
					})
					
				});
			});
		},
		
		//id에 해당하는 highCategory를 요청본문을 토대로 업데이트한다.
		updateHighCategory: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			HighCategory.update({_id: req.params.id}, req.body ,function(err, response){
				if(err) console.error(err);
				if(response.nModified === 1){
					res.json({
						success: true,
						id: req.params.id,
					});
				} else {
					res.json({
						success: false,
						message: ''
					});
				}
			});
		},

	}
}