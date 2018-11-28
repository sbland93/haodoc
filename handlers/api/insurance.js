var Insurance = require('../../models/insurance.js');
var insuranceViewModel = require('../../viewModels/insurance.js');

module.exports = function(){
	return {
		
		
		getInsurances: function(req, res, next){
			Insurance.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, payers){
				if(err) return next(err);
				res.json(payers.map(insuranceViewModel));
			});
		},
		
		//요청본문에 해당하는 insurance를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newInsurance: function(req, res, next){
			if(req.body.questionType && req.body.password){
				Insurance.create(req.body, function(err, insurance){
					if(err) return next(err);
					res.json({
						success: true,
						id: insurance._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Some Field is not filled yet.',
				});
			}
		},
		
		//해당 id의 insurance를 available상태로 만들고 응답은 success를 담아준다.
		getInsurance: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Insurance.findById({_id: req.params.id}, function(err, insurance){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!insurance){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(insuranceViewModel(insurance));
			});
		},
		
		//id에 해당하는 insurance를 삭제한다.
		deleteInsurance: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Insurance.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		
		//id에 해당하는 insurance를 요청본문을 토대로 업데이트한다.
		updateInsurance: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Insurance.update({_id: req.params.id}, req.body ,function(err, response){
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