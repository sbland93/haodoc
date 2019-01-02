var CouponReview = require('../../models/couponReview.js');
var couponReviewViewModel = require('../../viewModels/couponReview.js');

module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 user에 해당하는 것들을 내보내고
		//Query가 없으면 모든 CouponReview를 내보낸다.
		getCouponReviews: function(req, res, next){
			CouponReview.find(req.query).populate("coupon")
			.exec(function(err, users){
				if(err) return next(err);
				res.json(users.map(couponReviewViewModel));
			});
		},
		//요청본문에 해당하는 user를 새로 생성한다.
		//유저생성을 위한 post에서는 name과 email과 password가 있어야한다.
		newCouponReview: function(req, res, next){
			if(req.body.name && req.body.content){
				CouponReview.create(req.body, function(err, couponReview){
					if(err) return next(err);
					res.json({
						success: true,
						id: couponReview._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'some content is not filled',
				});
			}
		},
		//해당 id의 user를 available상태로 만들고 응답은 success를 담아준다.
		getCouponReview: function(req, res, next){
			if(!req.params.id) return next('No Id');
			CouponReview.findById({_id: req.params.id}, function(err, couponReview){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!couponReview){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(couponReviewViewModel(couponReview));
			});
		},
		//id에 해당하는 user를 삭제한다.
		deleteCouponReview: function(req, res, next){
			if(!req.params.id) return next('No Id');
			CouponReview.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},
		//id에 해당하는 user를 요청본문을 토대로 업데이트한다.
		updateCouponReview: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			CouponReview.update({_id: req.params.id}, req.body ,function(err, response){
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