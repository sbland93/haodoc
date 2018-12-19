
var url =  new URLSearchParams(window.location.search);
var allString = "全部";
var _categoryName = allString;

if(url.has('category'))	_categoryName = url.get('category');

var app = new Vue({

	el : "#event_app",
	
	data : {

		events: [],
		coupons: [],
		products : [], //이벤트 + 쿠폰을 합쳐서 만든 리스트.
		sortedList : [],
		sortBase : "products", //전체, 이벤트, 쿠폰 ( "products", "events", "coupons" )
		banners: "",
		category : "",
		categorys: "",
	},
	
	
	mounted : function(){

		var self = this;
		//categorys 초기화 후에, queryString에 카테고리가 존재한다면
		//해당하는 category를 찾아, self.cateogry에 초기화.
		var categoryPromise = new Promise(function(resolve, reject){
			getCategorys().then(function(rtn){
				self.categorys = rtn;
				if(_categoryName !== allString){
					self.findCategory(_categoryName);
					resolve();
				}
			});
		});

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

		Promise.all([categoryPromise, eventPromise, couponPromise]).then(function(){

			self.products = self.coupons.concat(self.events);
			self.products = util_sort_updated_at(self.products);
			self.sortedList = self.products;
			self.doSort();

		});

		util_data_init(this, getBanners, "banners");
		

	},

	methods: {
		
		//sortedList에 (전체, 이벤트, 쿠폰)중 클릭되어있는 값을 넣고, 그중에 현재 카테고리에 해당하는 값만 골라둔다.
		doSort : function(){
			var self = this;
			self.sortedList = self[self.sortBase];
			self.sortedList = self.sortCategory(self.sortedList);
			setTimeout(common_make_box, 250); //common.js 안에 있는 함수, box에 클릭이벤트를 다시 묶어준다.
		},

		//_arr을 받아서, 현재 카테고리를 포함하는 객체만 모아서 배열을 돌려준다.
		//현재 카테고리가 설정되어있지 않은경우(전부) 일경우 그냥 리턴한다.
		sortCategory : function(_arr){
			var self = this;
			if(!self.category) return _arr;
			var returnArr =  _arr.filter((el) => {
				return el.categorys.includes(self.category.categoryName);
			});
			console.log(returnArr);
			return returnArr;
		},

		//category이름을 넣어주면 해당하는 카테고리를 카테고리리스트(categorys)에서 찾아서
		//해당 카테고리를 self.category에 넣어준다.
		findCategory : function(categoryName){
			var self = this;
			self.categorys.map(function(obj){
				if(obj.categoryName === categoryName){
					self.category = obj;
				}
			});
		},

		//Active값을 변경후에, sortBase값을 초기화시킨다.
		changeBase : function(clickedBase){
			
			var self = this;
			var beforeSelector = "#base-"+self.sortBase;
			var afterSelector = "#base-"+clickedBase;
			$(beforeSelector).removeClass("active");
			$(afterSelector).addClass("active");
			self.sortBase = clickedBase;
			self.doSort();

		},

		//현재 카테고리를 변경시킨후에 Sorting 해준다.
		changeCategory : function(categoryName){

			var self = this;
			if(categoryName === allString){ 
				
				self.category = "";
				return self.doSort();
			}
			self.findCategory(categoryName);
			self.doSort();
		
		}

	}


})