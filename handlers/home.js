
module.exports = function(){
	return {
		
		team : function(req, res, next){
			res.render('main/team');
		},
		
		admin: function(req, res, next){
			res.render('admin/admin');	
		},

	}
	
}