var Accompany = require('../../models/accompany.js');
var accompanyViewModel = require('../../viewModels/accompany.js');

module.exports = function(){
	return {
		
		
		getAccompanys: function(req, res, next){
			Accompany.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(accompanyViewModel));
			});
		},
		
		//요청본문에 해당하는 accompany를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newAccompany: function(req, res, next){
			if(req.body.name && req.body.password && req.body.symptom && req.body.wechatID){
				Accompany.create(req.body, function(err, accompany){
					if(err) return next(err);
					res.json({
						success: true,
						id: accompany._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		},
		
		//해당 id의 accompany를 available상태로 만들고 응답은 success를 담아준다.
		getAccompany: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Accompany.findById({_id: req.params.id}, function(err, accompany){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!accompany){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(accompanyViewModel(accompany));
			});
		},
		
		//id에 해당하는 accompany를 삭제한다.
		deleteAccompany: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Accompany.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 accompany를 요청본문을 토대로 업데이트한다.
		updateAccompany: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Accompany.update({_id: req.params.id}, req.body ,function(err, response){
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