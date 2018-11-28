var Translate = require('../../models/translate.js');
var translateViewModel = require('../../viewModels/translate.js');

module.exports = function(){
	return {
		
		
		getTranslates: function(req, res, next){
			Translate.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(translateViewModel));
			});
		},
		
		//요청본문에 해당하는 translate를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newTranslate: function(req, res, next){
			if(req.body.agreement && req.body.content){
				Translate.create(req.body, function(err, translate){
					if(err) return next(err);
					res.json({
						success: true,
						id: translate._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		},
		
		//해당 id의 translate를 available상태로 만들고 응답은 success를 담아준다.
		getTranslate: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Translate.findById({_id: req.params.id}, function(err, translate){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!translate){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(translateViewModel(translate));
			});
		},
		
		//id에 해당하는 translate를 삭제한다.
		deleteTranslate: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Translate.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 translate를 요청본문을 토대로 업데이트한다.
		updateTranslate: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Translate.update({_id: req.params.id}, req.body ,function(err, response){
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