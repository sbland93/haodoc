

var app = new Vue({

	el : "#main_app",
	
	data : {

		events: "",
		coupons: "",
		products : "", //event, coupon두개를 합친 product
		banners: "",
		highCategorys: "",
	
	},

	
	mounted : function(){

		var self = this;
		

		var eventPromise = new Promise(function(resolve, reject){
			getEvents().then(function(_rtn){
				self.events = _rtn;
				resolve();
			});
		});

		var couponPromise = new Promise(function(resolve, reject){
			getCoupons().then(function(_rtn){
				self.coupons = _rtn;
				resolve();
			});
		});

		Promise.all([eventPromise, couponPromise]).then(function(){

			self.products = self.coupons.concat(self.events);
			self.products = util_sort_updated_at(self.products);
			
		});

		util_data_init(this, getBanners, "banners");
		// getCategorys().then(function(categorys){
		// 	self.categorys = categorys;
		// 	setTimeout(common_make_swiper, 300);
		// });
		getHighCategorys().then(function(highCategorys){

			self.highCategorys = highCategorys;
			setTimeout(common_make_swiper, 300);
		
		});

	},

	methods: {
		
		
	}



})







