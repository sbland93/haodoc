var User = require('../models/user.js');

module.exports = function(){
	return {
		
		home:  function(req, res, next){
			res.render('main2');
		},

		about: function(req, res, next){
			res.render('home/about');
		},
		personal: function(req, res, next){
			res.render('home/footer/personal');
		},
		rules : function(req, res, next){
			res.render('home/footer/rules');
		},

		team : function(req, res, next){
			res.render('home/team');
		},		
		admin: function(req, res, next){
			User.find({}).sort({updated_at: -1}).exec(function(err, users){
				res.render('admin/admin', {
					userList: users
				});	
			});
		},


		events: function(req, res, next){
			res.render('home/event/event');
		},

		eventInfo: function(req, res, next){
			res.render('home/event/eventInfo');
		},

		/*

		For Development Temp Handlers


		*/


		home2: function(req, res, next){
			res.render('main2');
		},
		//for Finding Hospital
		find : function(req, res, next){



			res.render('hospital/find');
		}


		/*

		For robots.txt

		*/


	}
	
}