var Payer = require('../../models/payer.js');
var payerViewModel = require('../../viewModels/payer.js');

module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 payer에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Payer를 내보낸다.
		getPayers: function(req, res, next){
			Payer.find(req.query).populate("coupon")
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(payerViewModel));
			});
		},
		//요청본문에 해당하는 payer를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newPayer: function(req, res, next){
			if(req.body.wechatID && req.body.birthDay){
				Payer.create(req.body, function(err, payer){
					if(err) return next(err);
					res.json({
						success: true,
						id: payer._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'TITLE CONTENT SCHOOL REQUIRED',
				});
			}
		},
		//해당 id의 payer를 available상태로 만들고 응답은 success를 담아준다.
		getPayer: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Payer.findById({_id: req.params.id}, function(err, payer){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!payer){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(payerViewModel(payer));
			});
		},
		//id에 해당하는 payer를 삭제한다.
		deletePayer: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Payer.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		//id에 해당하는 payer를 요청본문을 토대로 업데이트한다.
		updatePayer: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Payer.update({_id: req.params.id}, req.body ,function(err, response){
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