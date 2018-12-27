

var app = new Vue({

	el : "#feed_app",
	
	data : {

		banners: "",
		feeds: "",
	},

	mounted : function(){

		var self = this;

		getBanners().then(function(rtn){
			
			self.banners = rtn;
			
			setTimeout(feed_swiper, 500);
		
		});

		util_data_init(this, getFeeds, "feeds");

	},

	methods: {
		




		
	}



})