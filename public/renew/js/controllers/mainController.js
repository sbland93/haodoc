

var app = new Vue({

	el : "#main_app",
	
	data : {

		events: "",
		coupons: "",
		banners: "",
		categorys: "",
	},
	
	
	mounted : function(){

		var self = this;
		util_data_init(this, getEvents, "events");
		util_data_init(this, getCoupons, "coupons");
		util_data_init(this, getBanners, "banners");
		getCategorys().then(function(rtn){
			console.log(rtn);
		})
		util_data_init(this, getCategorys, "categorys");

	},

	
	
	methods: {
		




		
	}





})