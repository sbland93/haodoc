
var url =  new URLSearchParams(window.location.search);
var allString = "전부";
var _categoryName = allString;


if(url.has('category'))	_categoryName = url.get('category');

var app = new Vue({

	el : "#event_app",
	
	data : {

		events: "",
		coupons: "",
		banners: "",
		category : "",
		categorys: "",
	},
	
	
	mounted : function(){

		var self = this;
		
		util_data_init(this, getEvents, "events");
		util_data_init(this, getCoupons, "coupons");
		util_data_init(this, getBanners, "banners");
		//categorys 초기화 후에, queryString에 카테고리가 존재한다면
		//해당하는 category를 찾아, self.cateogry에 초기화.
		util_data_init(this, getCategorys, "categorys", function(rtn){
			self["categorys"] = rtn;
			if(_categoryName !== allString){
				self.categorys.map(function(obj){
					if(obj.categoryName === _categoryName){
						self.category = obj;
					}
				});
			}
		});

	},

	methods: {
		


	}


})