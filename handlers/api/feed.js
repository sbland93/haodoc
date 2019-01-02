var Feed = require('../../models/feed.js');
var feedViewModel = require('../../viewModels/feed.js');

module.exports = function(){
	return {
		
		getFeeds: function(req, res, next){
			Feed.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(feedViewModel));
			});
		},
		
		//요청본문에 해당하는 feed를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newFeed: function(req, res, next){
			
			if(req.body.title && req.body.content && req.body.url){

				var feed_Image = req.files[0];
				var mobile_Image = req.files[1];

				if(feed_Image["fieldname"] === "feedImage" 
					&& mobile_Image["fieldname"] === "mobileImage"){
					
					req.body["feedImage"] = feed_Image["filename"];
					req.body["mobileImage"] = mobile_Image["filename"];

				}else{
					
					req.body["feedImage"] = mobile_Image["filename"];
					req.body["mobileImage"] = feed_Image["filename"];
				
				}

				Feed.create(req.body, function(err, feed){
					
					if(err) return next(err);
					res.json({
						success: true,
						id: feed._id,
					});
				
				});

			}else{
				
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			
			}

		},
		
		//해당 id의 feed를 available상태로 만들고 응답은 success를 담아준다.
		getFeed: function(req, res, next){
			
			if(!req.params.id) return next('No Id');
			
			Feed.findById({_id: req.params.id}, function(err, feed){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!feed){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(feedViewModel(feed));
			});
		
		},
		
		//id에 해당하는 feed를 삭제한다.
		deleteFeed: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Feed.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 feed를 요청본문을 토대로 업데이트한다.
		updateFeed: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Feed.update({_id: req.params.id}, req.body ,function(err, response){
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