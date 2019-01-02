var Subway = require('../../models/subway.js');
var subwayViewModel = require('../../viewModels/subway.js');

module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 Subway에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Subway를 내보낸다.
		getSubways: function(req, res, next){
			Subway.find(req.query)
			.exec(function(err, subways){
				if(err) return next(err);
				res.json(subways.map(subwayViewModel));
			});
		},
		//요청본문에 해당하는 Subway를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newSubway: function(req, res, next){
			if(req.body.wechatID && req.body.birthDay){
				Subway.create(req.body, function(err, subway){
					if(err) return next(err);
					res.json({
						success: true,
						id: subway._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'TITLE CONTENT SCHOOL REQUIRED',
				});
			}
		},
		//해당 id의 Subway를 available상태로 만들고 응답은 success를 담아준다.
		getSubway: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Subway.findById({_id: req.params.id}, function(err, subway){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!subway){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(subwayViewModel(subway));
			});
		},
		//id에 해당하는 Subway를 삭제한다.
		deleteSubway: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Subway.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		//id에 해당하는 Subway를 요청본문을 토대로 업데이트한다.
		updateSubway: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Subway.update({_id: req.params.id}, req.body ,function(err, response){
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