var Coupon = require('../../models/coupon.js');
var couponViewModel = require('../../viewModels/coupon.js');

var fs = require('fs');
var path = require('path');


var deleteFiles = function(base_path, file_name_arr){
	var delete_promise_arr = [];

	for (var i = file_name_arr.length - 1; i >= 0; i--) {
		//하나의 transaction 단위로 묶어야 한다. TODO
		var delete_prmoise = new Promise(function(resolve, reject){
			fs.unlink(path.join(__dirname + base_path) + file_name_arr[i], (err) => {
				resolve();
			});
		});

		delete_promise_arr.push(delete_prmoise);
		
	}

	return delete_promise_arr;

}


module.exports = function(){
	return {
		//Query를 보내면,쿼리에 해당하는 Coupon에 해당하는 것들을 내보내고
		//Query가 없으면 모든 Coupon를 내보낸다.
		getCoupons: function(req, res, next){
			Coupon.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, coupons){
				if(err) return next(err);
				res.json(coupons.map(couponViewModel));
			});
		},
		//요청본문에 해당하는 Coupon를 새로 생성한다.
		//이벤트 생성을 위한 post에서는 이벤트이름과, 이벤트 기간, 병원 주소, 병원 이름, 지하철이 있어야 한다.
		newCoupon: function(req, res, next){
			if(req.body.couponName && req.body.couponRange && req.body.address && req.body.hospitalName && req.body.subway){
				//새로운 이벤트 객체를 만든다. 이벤트 이미지는 세개로 나뉘어서 들어온다.
				var newCouponObject = req.body;
				//순서 고정을 위해 세개의 칸을 잡아두고, 1, 2, 3이미지를 순서대로 넣는다.
				newCouponObject["couponImage"] = ["", "", ""];
				for (var i = req.files.length - 1; i >= 0; i--) {
					var thisFile = req.files[i];
					if(thisFile["fieldname"] == "thumbnailImage"){
						newCouponObject["thumbnailImage"] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "couponImage1"){
						newCouponObject["couponImage"][0] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "couponImage2"){
						newCouponObject["couponImage"][1] = thisFile["filename"];
					}
					if(thisFile["fieldname"] == "couponImage3"){
						newCouponObject["couponImage"][2] = thisFile["filename"];
					}
				}

				Coupon.create(newCouponObject, function(err, coupon){
					if(err) return next(err);
					res.json({
						success: true,
						id: coupon._id,
					});
				});

			}else{
				res.json({
					success: false,
					message: 'REQUIRED Field is not yet filled',
				});
			}

		},
		//해당 id의 Coupon를 available상태로 만들고 응답은 success를 담아준다.
		getCoupon: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Coupon.findById({_id: req.params.id}, function(err, coupon){
				if(err) console.error(err);
				/*DOLATER err 처리 */
				if(!coupon){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(couponViewModel(coupon));
			});
		},
		//id에 해당하는 Coupon를 삭제한다.
		deleteCoupon: function(req, res, next){
			if(!req.params.id) return next('No Id');
			
			Coupon.findById({_id: req.params.id}, function(err, coupon){
				if(err) return next(err);
				var imageArr =  coupon.couponImage;
				imageArr.push(coupon.thumbnailImage);
				//couponImages(file이름들)을 받아, 이벤트들을 삭제한다.
				Promise.all(deleteFiles('../../../public/images/coupon/all/', imageArr)).then(function(rtn){
					Coupon.remove({_id: req.params.id}, function(err){
						if(err) return next(err);
						res.json({
							success: true,
							id: req.params.id,
						});
					})
				}).catch(function(rtn){
					console.log(rtn);
				});
			
			});

		},
		//id에 해당하는 Coupon를 요청본문을 토대로 업데이트한다.
		updateCoupon: function(req, res, next){
			if(!req.params.id) return next('No Id');
			//DOLATER req.body를 그대로 신뢰해서는 안된다.
			Coupon.update({_id: req.params.id}, req.body ,function(err, response){
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