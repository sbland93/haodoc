var User = require('../models/user.js');

module.exports = function(){
	return {
		
		home:  function(req, res, next){
			res.render('home/main/main');
		},
		
		about: function(req, res, next){
			res.render('home/about');
		},

		team : function(req, res, next){
			res.render('home/team');
		},		
		
		events: function(req, res, next){
			res.render('home/event/event');
		},

		eventInfo: function(req, res, next){
			res.render('home/event/eventInfo');
		},

		couponInfo : function(req, res, next){
			res.render('home/coupon/couponInfo');
		},

		personal: function(req, res, next){
			res.render('home/footer/personal');
		},

		rules : function(req, res, next){
			res.render('home/footer/rules');
		},
		
		admin: function(req, res, next){
			res.render('admin/admin');	
		},




	}
	
}