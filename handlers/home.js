var User = require('../models/user.js');

module.exports = function(){
	return {
		
		home:  function(req, res, next){
			res.render('home/main');
		},
		about: function(req, res, next){
			res.render('home/about');
		},
		hpv1: function(req, res, next){
			res.render('home/hpv1');
		},
		hpv2: function(req, res, next){
			res.render('home/hpv2');
		},
		admin: function(req, res, next){
			User.find({}).sort({updated_at: -1}).exec(function(err, users){
				res.render('admin/admin', {
					userList: users
				});	
			});
		},

	}
	
}