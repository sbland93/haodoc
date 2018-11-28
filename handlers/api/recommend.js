var Recommend = require('../../models/recommend.js');
var recommendViewModel = require('../../viewModels/recommend.js');

module.exports = function(){
	return {
		
		
		getRecommends: function(req, res, next){
			Recommend.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(recommendViewModel));
			});
		},
		
		//요청본문에 해당하는 recommend를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newRecommend: function(req, res, next){
			if(req.body.symptom && req.body.position && req.body.name && req.body.password){
				Recommend.create(req.body, function(err, recommend){
					if(err) return next(err);
					res.json({
						success: true,
						id: recommend._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		},
		
		//해당 id의 recommend를 available상태로 만들고 응답은 success를 담아준다.
		getRecommend: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Recommend.findById({_id: req.params.id}, function(err, recommend){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!recommend){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(recommendViewModel(recommend));
			});
		},
		
		//id에 해당하는 recommend를 삭제한다.
		deleteRecommend: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Recommend.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 recommend를 요청본문을 토대로 업데이트한다.
		updateRecommend: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Recommend.update({_id: req.params.id}, req.body ,function(err, response){
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