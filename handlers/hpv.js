
module.exports = function(){
	return {
		
		hpv0: function(req, res, next){
			res.render('hpv/hpv0');
		},

		hpv1: function(req, res, next){
			res.render('hpv/hpv1');
		},

		hpv2: function(req, res, next){
			res.render('hpv/hpv2');
		}


	}
	
}