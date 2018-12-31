

//Watch로 high, middle, low를 살펴본다.
//독립적으로 움직이면서 서로 신호를 보내도록 만든다.

var url =  new URLSearchParams(window.location.search);
var allString = "全部";
var _categoryName = allString;

if(url.has('high'))	console.log(url.get('high'));
if(url.has('middle'))	console.log(url.get('middle'));
if(url.has('low'))	console.log(url.get('low'));

var app = new Vue({

	el : "#event_app",
	
	data : {

		events: [],
		coupons: [],
		products : [], //이벤트 + 쿠폰을 합쳐서 만든 리스트.
		highCategorys: "",
		//high, middle, low는 현재 선택받은 대,중,소분류의 obj를 잡고 있는다.
		high: undefined,
		middle: undefined,
		low : undefined,

		sortBase : "products", //전체, 이벤트, 쿠폰 ( "products", "events", "coupons" )
		banners: "",
		category : "", //현재카테고리
		categorys: "",
	},
	
	
	mounted : function(){

		var self = this;
		//Mounting 될시에 url로 넘어온 high, middle, low의 categoryName text를 통해
		//highCategorys, middleCategorys, lowCategorys를 차례로 돌며 일치하는 obj 값을 high, middle, low에 추가한다.
		getHighCategorys().then(function(rtn){
			self.highCategorys = rtn;
			self.high = self.highCategorys.find(function(el){ return el.categoryName === url.get("high") });
			if(self.high && url.get('middle')) self.middle = self.high.middleCategorys.find(function(el){ return el.categoryName === url.get('middle')});
			if(self.middle && url.get('low')) self.low = self.middle.lowCategorys.find(function(el){ return el.categoryName === url.get('low')});
			self.get_by_query();
			setTimeout(common_make_box, 300);
			setTimeout(common_make_swiper, 300);
		});

		util_data_init(this, getBanners, "banners");
		
	},


	computed: {

		//DB에 보낼 query를 자동으로 작성한다.
		query: function(){
			var self = this;

			var _rtnValue = {};
			if(self.high) _rtnValue['highCategorys'] = self.high.categoryName;
			if(self.middle) _rtnValue['middleCategorys'] = self.middle.categoryName;
			if(self.low) _rtnValue['lowCategorys'] = self.low.categoryName;

			return _rtnValue;
		}

	},

	methods: {


		find_by_categoryName : function(_arr, whichCategory){
			var self = this;
			var returnValue = undefined;
			_arr.map(function(el){
				if(el.categoryName === url.get(whichCategory)){
					returnValue = el;
				}
			});
			return returnValue;
		},
 
		get_by_query : function(){

			var self = this;
			var p1, p2;

				
			var p1 = new Promise(function(resolve, reject){
				getCoupons(self.query).then(function(coupons){
					resolve(coupons);
				});
			});
			
			
			var p2 = new Promise(function(resolve, reject){
				getEvents(self.query).then(function(events){
					resolve(events);
				});
			});
			

			Promise.all([p1 , p2]).then(function(rtn){
				
				var products = rtn[0].concat(rtn[1]);
				self.products = util_sort_updated_at(products);
				setTimeout(common_make_box, 200); //common.js 안에 있는 함수, box에 클릭이벤트를 다시 묶어준다.
				setTimeout(common_make_swiper, 200); //common.js 안에 있는 함수, box에 클릭이벤트를 다시 묶어준다.
			
			});

		},
		

		//_arr을 받아서, 현재 카테고리를 포함하는 객체만 모아서 배열을 돌려준다.
		//현재 카테고리가 설정되어있지 않은경우(전부) 일경우 그냥 리턴한다.
		sortCategory : function(_arr){
			var self = this;
			if(!self.category) return _arr;
			var returnArr =  _arr.filter((el) => {
				return el.categorys.includes(self.category.categoryName);
			});
			return returnArr;
		},

		//Active값을 변경후에, sortBase값을 초기화시킨다.
		changeBase : function(clickedBase){
			
			var self = this;
			var beforeSelector = "#base-"+self.sortBase;
			var afterSelector = "#base-"+clickedBase;
			$(beforeSelector).removeClass("active");
			$(afterSelector).addClass("active");
			self.sortBase = clickedBase;

		},

		//self[attrString]을 = value로 변경해주는 함수
		changeValue: function(attrString, value){ 
			
			var self = this;
			self[attrString] = value;
			if(value === "high"){
				self.middle = undefined;
				self.low = undefined;
			}else if(value === "middle"){
				self.low = undefined;
			}
			self.get_by_query();

		
		}

	}


})