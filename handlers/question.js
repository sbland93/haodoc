
module.exports = function(){
	
	return {
		
		question: function(req, res, next){
			res.render("question/question")
		},

		recommend : function(req, res, next){
			res.render("question/recommend/recommend")			
		},

		recommendInfo : function(req, res, next){
			res.render("question/recommend/recommendInfo")			
		},

		translate : function(req, res, next){
			res.render("question/translate/translate");
		},

		translateInfo : function(req, res, next){
			res.render("question/translate/translateInfo");
		},

		insurance : function(req, res, next){
			res.render('question/insurance/insurance');
		},

		insuranceInfo : function(req, res, next){
			res.render('question/insurance/insuranceInfo');
		},
		
		accompany : function(req, res, next){
			res.render('question/accompany/accompany');
		},

		accompanyInfo : function(req, res, next){
			res.render('question/accompany/accompanyInfo');
		},
	}
	
}