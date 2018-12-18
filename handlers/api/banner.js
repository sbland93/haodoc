var Banner = require('../../models/banner.js');
var bannerViewModel = require('../../viewModels/banner.js');
var util_server = require('../../util_server.js')();
module.exports = function(){
	return {
		
		
		getBanners: function(req, res, next){
			Banner.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(bannerViewModel));
			});
		},
		
		//요청본문에 해당하는 banner를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newBanner: function(req, res, next){
			if(req.body.url && req.body.category){
				//bannerImage , mobileImage 두개 존재
				var banner_Image = req.files[0];
				var mobile_Image = req.files[1];

				if(banner_Image["fieldname"] === "bannerImage" 
					&& mobile_Image["fieldname"] === "mobileImage"){
					
					req.body["bannerImage"] = banner_Image["filename"];
					req.body["mobileImage"] = mobile_Image["filename"];

				}else{
					
					req.body["bannerImage"] = mobile_Image["filename"];
					req.body["mobileImage"] = banner_Image["filename"];
				
				}

				Banner.create(req.body, function(err, banner){
					if(err) return next(err);
					res.json({
						success: true,
						id: banner._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		},
		
		//해당 id의 banner를 available상태로 만들고 응답은 success를 담아준다.
		getBanner: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Banner.findById({_id: req.params.id}, function(err, banner){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!banner){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(bannerViewModel(banner));
			});
		},
		
		//id에 해당하는 banner를 삭제한다.
		deleteBanner: function(req, res, next){
			if(!req.params.id) return next('No Id');
			var banner_dir = "/public/images/banner/all/"
			Banner.findById({_id: req.params.id}, function(err, banner){
				if(err) return console.error(err);
				/*DOLATER err 처리 */
				if(!banner){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				var imageArr = [banner.bannerImage, banner.mobileImage];
				util_server.deleteFiles(banner_dir, imageArr, function(rtn){
					//파일처리에서 일부러 error 처리를 현재 하지 않는 중, 이미지 관리를 자유로 하고있기 때문에 , no dir error 빈번하게 발생.
					banner.remove(function(err){
						if(err) return next("Not Deleted");
						return res.json({success: true});
					})
				});
			});
		},
		
		//id에 해당하는 banner를 요청본문을 토대로 업데이트한다.
		updateBanner: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Banner.update({_id: req.params.id}, req.body ,function(err, response){
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