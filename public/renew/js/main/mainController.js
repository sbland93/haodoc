

var app = new Vue({

	el : "#main_app",
	
	data : {

		events: "",
		coupons: "",

	},
	
	
	mounted : function(){

		var self = this;
		self.getEvents();
		self.getCoupons();

	},

	
	
	methods: {
		
		getEvents : function(){
			util_vue_init(this, getEvents, "events");
		},

		getCoupons : function(){
			util_vue_init(this, getCoupons, "coupons");
		},

	}

})