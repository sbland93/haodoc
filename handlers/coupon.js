


module.exports = function(){
	return {
		
		coupon0: function(req, res, next){
			res.render('coupon/payment/coupon0');
		},

		coupon1: function(req, res, next){
			res.render('coupon/payment/coupon1');
		},

		coupon2: function(req, res, next){
			res.render('coupon/payment/coupon2');
		}


	}
	
}