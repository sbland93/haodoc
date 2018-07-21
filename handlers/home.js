
module.exports = function(){
	return {
		
		home:  function(req, res, next){
			res.render('layouts/main');
		},
		about: function(req, res, next){
			res.render('home/brand');
		},
		hpv1: function(req, res, next){
			res.render('home/hpv1');
		},
		hpv2: function(req, res, next){
			res.render('home/hpv2');
		},

	}
	
}