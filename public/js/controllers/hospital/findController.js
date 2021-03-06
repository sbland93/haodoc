//HospitalData를 script에 포함시키는 것이 선행 되어야 한다.




/*  Marker를 찍는 함수  */
const makeMarker = function(map, position, index, hospitalObj) {

    var marker = new naver.maps.Marker({
        map: map,
        position: position,
        icon: {
        	url: '/images/pin/'+index+'.png',
        }
    });

    var contentString = [
	    '<div class="iw_inner">',
	    '   <a href="/hospital/'+ hospitalObj.id +'"><h3 class="logoColor text-center" style="padding:10px">' + hospitalObj.name + '</h3></a>',
	    '   <p style="padding:15px">',
	    '详细地址 - ' + hospitalObj.address +'<br>',
	    '电话号 - ' + hospitalObj.tel + '<br>',
	    '   </p>',
	    '</div>'
	].join('');

	var infowindow = new naver.maps.InfoWindow({
	    content: contentString,
	    borderColor: "#BD1622",
	});

	naver.maps.Event.addListener(marker, "click", function(e) {
	    if (infowindow.getMap()) {
	        infowindow.close();
	    } else {
	        infowindow.open(map, marker);
	    }
	});

    return marker;

}


//Vue 앱 만들기.
var app = new Vue({

	el : "#app",
	
	data : {

		map : '',

		numOfPage : 0,
		index : 1,
		pageHospitals : [],
		
		hospitalList : [],
		city : "서울특별시(首尔特别市)",
		district : "서대문구(西大門區)",
		neighborhood : "창천동(滄川洞)",
		//neighborhood : "선택없음",
		subject : "没有选择",
		//subject : "선택없음",
		subway : "新村站",
		//subway : "홍대입구역",
		subwayRender : true,
		addressRender : false,
		keywordRender: false,
		isHospitals : true,
		//키워드 입력을 두글자이상하지 않을시에 주의사항을 알려준다.
		keywordCondition: false,
		//지하철입력검색시 쓰이는 것.
		subwayKeyword: '',
		subwaySubject : "没有选择",

		//병원명검색키워드
		keyword : '',
		//From Data.js
		districtList : districtList,
		//subjectList : subjectList,
		subjectList : _subjectList,
		//subwayList : subwayList,
		subwayList : _subwayList,
	},
	
	computed : {

		//변화에 대응해 자동으로 query를 만들어준다.
		query : function(){
			
			var computedQuery = {
			
			}

			//진료과목별 선택을 하기 위해서
			if(this.subject !== "没有选择"){

				//진료과목이 병원 이름 안에 있을 경우에 찾아야 한다.
				computedQuery["subjects"] = this.subject;
			
			}

			if(this.subwayRender === true){ //지하철역별 검색일시

				computedQuery["subway"] = this.subway;
			
			}else{ //주소기반 검색일시 (addressRender === true)
				computedQuery["city"] = this.city.replace(/\(.*\)/,"");
				computedQuery["district"] = this.district.replace(/\(.*\)/,"");
				//address에 동을 포함하고 있는것을 찾기 위함.
				if(this.neighborhood !== "没有选择") computedQuery["address"] = { "$regex" : this.neighborhood.replace(/\(.*\)/,""), "$options": "i" };
			}
			for(var key in computedQuery){
				if ( computedQuery[key] === "没有选择" ){
				//if ( computedQuery[key] === "선택없음" ){
					delete computedQuery[key];
				}
			}
			return computedQuery;
		},

		//map의 중심의 위경도를 구하기 위해 보낼 주소의 String
		centerString : function(){

			var centerString = "";
			
			if(this.subwayRender === true){ //지하철역 방식 Rendering

				//centerString += subwayDic[this.subway];
				centerString += _subwayDic[this.subway];
			
			}else{ //주소방식 Rendering

				centerString += this.district.replace(/\(.*\)/,"");
				centerString += " ";
				if(this.neighborhood !== "没有选择") centerString += this.neighborhood.replace(/\(.*\)/,"");
				//if(this.neighborhood !== "선택없음") centerString += this.neighborhood;

			}

			return centerString;
		},
		
		//District에 해당하는 Neighborhood를 내야하기 때문에.
		neighborList : function(){

			return neighborDictionary[this.district];

		},
		
	},
	
	mounted : function(){

		
		var self = this;
		var defaultQuery = {"district": "서대문구", "address" : {"$regex": "창천동", "$options": "i" } };
		this.getHospital(defaultQuery, self.keywordRender);

	},

	watch: {

		district : function(newDistrict){
			//구 변경시 구청이 뜨므로, 이를 동이 나오게끔 해야 병원이 찍혀있을것.
			this.neighborhood = neighborDictionary[newDistrict][0];
			this.getHospital(this.query, this.keywordRender);

		},
		neighborhood : function(newNeighbor){

			this.getHospital(this.query, this.keywordRender);
		
		},
		subject : function(newSubject){

			this.getHospital(this.query, this.keywordRender);

		},
		subway : function(newSubway){
			this.getHospital(this.query, this.keywordRender);
		},
		//역 주변 검색 OR 지역별 검색에 따라서 선택한다.
		addressRender : function(newSubject){

			this.subject = "没有选择";
			//this.subject = "선택없음";
			this.getHospital(this.query, this.keywordRender);
		},
		subwayRender : function(newValue, oldValue){
			var self = this;	
			//다른 검색 방식에서 기본방식인 subwayRender로 돌아올 경우, 기본의 값들(신촌 서대문구 창천동)을 보여주고, subwayKeyword를 삭제한다.
			if(newValue === true && oldValue === false){
				var defaultQuery = {"district": "서대문구", "address" : {"$regex": "창천동", "$options": "i" } };
				self.getHospital(defaultQuery, self.keywordRender);
				self.subwayKeyword = "";
			}
		},
		//index 변경시에 scroll을 top으로 이동시켜야함.
		index : function(newIndex, oldIndex){
			$(".listing-block").scrollTop(0);
		},


	},
	
	methods: {

		showKeyword: function(){
			this.renderChange("keywordRender");
		},
		showAddress : function(){
			this.renderChange("addressRender");
		},
		showSubway : function(){
			this.renderChange("subwayRender");
		},

		renderChange : function(kind_of_render){
			
			var self = this;
			self.keywordRender = false;
			self.subwayRender = false;
			self.addressRender = false;
			self[kind_of_render] = true;

		},
		searchByKeyword : function(){
			if(this.keyword.length < 2){
				this.keywordCondition = true;
				return;
			}
			var keywordQuery = {name: { "$regex" : this.keyword, "$options": "i" }};
			this.getHospital(keywordQuery, this.keywordRender);
			this.keywordCondition = false;
			this.keyword = "";

		},

		//handlebars랑 겹쳐서, href를만드는 것을 method로 뺌. 방법을 강구해봐야할 듯.
		hospitalInfoHref : function(id){
		
			return "/hospital/"+id;
		
		},

		pinImageHref : function(index){
			
			return "/images/pin/"+index+".png";
		
		},
		
		//Full Address를 만들어 (시, 구, 동, 상세주소) 리턴한다.
		fullAddress : function(hospitalObj){
			
			var space = " ";
			return hospitalObj.city + space + hospitalObj.district + space + hospitalObj.address ;

		},
		
		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(query, isKeywordSearch){
			
			var self = this;
			var highRankPromise = new Promise(function(resolve, reject){resolve([])});
			//keywordSearch(병원이름으로 검색)이 아니라면, [시구동] 이경우 구까지
			if(!isKeywordSearch && !self.subwayRender){
				
				var keyword = "";
				keyword += self.district.replace(/\(.*\)/,"");
				if(self.neighborhood !== "没有选择"){
					keyword += " ";
					keyword += self.neighborhood.replace(/\(.*\)/,"");
				}
				if(self.subject !== "没有选择"){
					keyword += " ";
					keyword += self.subject;
				}
				//상단노출 병원을 찾아서 넘기는 Promsie , 밑의 getHospitals(주소로 찾는) 와 비동기로 하기 위해 Promise로 처리.
				highRankPromise = new Promise(function(resolve, reject){
					getHospitals({"keywords": keyword}).then(function(_hospitals){
						if(_hospitals.length === 0) _hospitals = [];
						resolve(_hospitals);
					}).catch(function(rtn){reject(rtn);});
				})

			}

			getHospitals(query).then(function(_hospitals){
				
				
				self.isHospitals = true;

				if(_hospitals.length == 0) self.isHospitals = false;
				
				highRankPromise.then(function(high_rank_hospital_arr){
					self.hospitalList = high_rank_hospital_arr.concat(_hospitals);

					//page당 10개씩 렌더링 할 것이므로 총 페이지수를 구한다.
					self.numOfPage = parseInt( self.hospitalList.length / 10 ) + 1;

					var myAddress = self.centerString;
					//keywordSearch하는 경우는, 첫 병원의 주소를 중심으로 지도를 움직여야 병원의 정보가 보인다.
					if(isKeywordSearch && _hospitals.length > 0) myAddress = _hospitals[0].address;

					naver.maps.Service.geocode({ address :  myAddress}, function(status, response){
						var result = response.result;
						
						var centerX = result.items[0].point.x,
							centerY = result.items[0].point.y;
						

						var map = new naver.maps.Map('map', {
							center : new naver.maps.Point(centerX, centerY),
						});
						self.map = map;

						self.changeIndex(1);

					});
				})


			}).catch(function(err){
				
				console.log(err);
			
			});
		},
		


		//index를 change하면 pageHospitals를 바꾸고, 해당하는 Hospitals에 대한 marker를 가진 map을 만든다.
		changeIndex : function(index){
			var self = this;
			//ex) index = 1 , slice(0, 10)
			self.index = index;
			var endNum = index * 10;
			var firstNum = endNum - 10;
			self.pageHospitals = self.hospitalList.slice(firstNum, endNum);
			
			//페이지 변경시에 새롭게 Map에 Marker를 찍는다.
			self.makeListMap(self.pageHospitals);


		},
		

		//hospitalPageList에 해당하는 Map을 초기화 후 Marker를 찍는다.
		makeListMap : function(hospitalPageList){
			//map의 중심을 잡기 위해 위,경도를 확인 후 Setting.
			var self = this;
			var map = new naver.maps.Map('map', {
				center: new naver.maps.Point(self.map.center.x, self.map.center.y)
			})
			self.map = map;
			//map에 hospital들의 위치 마커를 찍는다.
			for(var i = 0; i< hospitalPageList.length; i++){
				
				//marker 찍는 로직. 핀의 index를 위해 넘기고, xPos와, yPos를 넘긴다.
				var myaddr = new naver.maps.Point(hospitalPageList[i].xPos, hospitalPageList[i].yPos);
				makeMarker(self.map, myaddr, i, hospitalPageList[i]);

			}
		},


		getSubwayHospitals : function( ){
			
			var self = this;
			var subwayKeyword = self.subwayKeyword;
			self.hospitalList = [];

			//한국어 이름 혹은 중국어 이름 둘다 입력에 대응할 수 있게끔, 둘다 찾는다.
			var subwayQuery = {
				"$or" : [ 
				{
					'name': { 
						"$regex" : self.subwayKeyword,
						"$options": "i"
					}
				}, 
				{
					'chnName': { 
						"$regex" : self.subwayKeyword,
						"$options": "i"
					}
				}]
			};
			
			//지하철역의 정보(GPS)를 찾아온 후 그 coordinates를 활용해 가까운 병원을 찾는다.
			getSubways(subwayQuery).then(function(subways){
			
				//TODO 선택할 수 있도록 해줘야 하는데 무조건 첫번째꺼를 가져오고 있다.
				if(subways.length === 0){

					return;
				}

				var centerX = subways[0].xPos,
					centerY = subways[0].yPos;

				var map = new naver.maps.Map('map', {

					center: new naver.maps.Point(centerX, centerY),

				});
				
				var coordinates = [ centerX, centerY ];

				self.map = map;
				var subject = undefined;

				//진료과목별 선택을 하기 위해서
				if(self.subwaySubject !== "没有选择"){
					//진료과목이 병원 이름 안에 있을 경우에 찾아야 한다.
					subject = self.subwaySubject;
				}

				//상단노출이 되어 있는 병원을 가져온다. Promise로 처리해서, Near Hopsital이랑 비동기 처리가 가능하도록 한다.
				var highRankPromise = new Promise(function(resolve, reject){
					getHospitals({keywords : subways[0].name}).then(function(_hospitals){
						//상단노출 병원이 없으면 뒤에서 concat으로 합치므로 []로 넘긴다.
						if(_hospitals.length === 0) _hospitals = [];
						resolve(_hospitals);
					}).catch(function(rtn){
						reject(rtn);
					});
				}) 


				getNearHospitals(coordinates, 25, subject).then(function(_hospitals){

					self.isHospitals = true;
					if(_hospitals.length == 0) self.isHospitals = false;
					else{
						//상단노출 병원들을 받아온것이 확인되면, 이를 
						highRankPromise.then(function(high_rank_hospital_arr){
							self.hospitalList = high_rank_hospital_arr.concat(_hospitals);
							//page당 10개씩 렌더링 할 것이므로 총 페이지수를 구한다.
							self.numOfPage = parseInt( self.hospitalList.length / 10 ) + 1;
							self.changeIndex(1);
						});
					}
				});
			
			});


		}
	}

});


//Post loading.
/*var enterKey = function(actionFunc){
	if (window.event.keyCode == 13) {
 		actionFunc();
     }
}
loadPost();


function loadPost() {

  if (!!navigator.geolocation) 
  {
    navigator.geolocation.getCurrentPosition(successCallback,errorCallback);  
  }
  else

  {
    alert("이 브라우저는 Geolocation를 지원하지 않습니다");
  }

}    

function errorCallback(error)
{
    alert(error.message);
}    

function successCallback(position) { 
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        console.log("lat, lng", lat, lng);
}*/