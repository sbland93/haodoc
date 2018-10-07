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
		addressRender : true,
		subwayRender : false,

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
			console.log(computedQuery);
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
		this.getHospital(this.query);
	},

	watch: {

		district : function(newDistrict){
			console.log(newDistrict);
			//구 변경시 구청이 뜨므로, 이를 동이 나오게끔 해야 병원이 찍혀있을것.
			this.neighborhood = neighborDictionary[newDistrict][0];
			this.getHospital(this.query);

		},
		neighborhood : function(newNeighbor){

			this.getHospital(this.query);
		
		},
		subject : function(newSubject){

			this.getHospital(this.query);

		},
		subway : function(newSubway){
			this.getHospital(this.query);
		},
		//역 주변 검색 OR 지역별 검색에 따라서 선택한다.
		addressRender : function(newSubject){

			this.subject = "没有选择";
			//this.subject = "선택없음";
			this.getHospital(this.query);
		},
		//index 변경시에 scroll을 top으로 이동시켜야함.
		index : function(newIndex, oldIndex){
			$(".listing-block").scrollTop(0);
		},


	},
	
	methods: {

		//handlebars랑 겹쳐서, href를만드는 것을 method로 뺌. 방법을 강구해봐야할 듯.
		hospitalInfoHref : function(id){
		
			return "/hospital/"+id;
		
		},

		pinImageHref : function(index){
			
			return "/images/pin/"+index+".png";
		
		},
		showAddress : function(){

			this.subwayRender = false;
			this.addressRender = true;
		
		},
		showSubway : function(){

			this.addressRender = false;
			this.subwayRender = true;

		},
		//Full Address를 만들어 (시, 구, 동, 상세주소) 리턴한다.
		fullAddress : function(hospitalObj){
			
			var space = " ";
			return hospitalObj.city + space + hospitalObj.district + space + hospitalObj.address ;

		},
		
		//index를 change하면 pageHospitals를 바꾸고, 해당하는 Hospitals에 대한 marker를 가진 map을 만든다.
		changeIndex : function(index){
			
			//ex) index = 1 , slice(0, 10)
			this.index = index;
			var endNum = index * 10;
			var firstNum = endNum - 10;
			this.pageHospitals = this.hospitalList.slice(firstNum, endNum);
			console.log(this.pageHospitals);
			this.makeListMap(this.pageHospitals);

		},
		
		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(query){
			
			var self = this;

			getHospitals(query).then(function(_hospitals){
				//전체 hopsitalList
				self.hospitalList = _hospitals;
				//page당 10개씩 렌더링 할 것이므로 총 페이지수를 구한다.
				self.numOfPage = parseInt( _hospitals.length / 10 ) + 1;
				self.changeIndex(1);

			}).catch(function(err){
				
				console.log(err);
			
			});
		},
		
		//hospitalPageList에 해당하는 Map을 초기화 후 Marker를 찍는다.
		makeListMap : function(hospitalPageList){
			console.log(this.centerString);
			//map의 중심을 잡기 위해 위,경도를 확인 후 Setting.
			naver.maps.Service.geocode({ address : this.centerString }, function(status, response){
				
				var result = response.result;

				var centerX = result.items[0].point.x,
					centerY = result.items[0].point.y;

				var map = new naver.maps.Map('map', {

					center: new naver.maps.Point(centerX, centerY),

				});

				//index를 closer로 저장하기 위해 callback Function을 리턴하는 함수를 만든다.
				var mapCallback = function(index){
					
					return function(status, response) {
						if (status !== naver.maps.Service.Status.OK) {
							return alert(hospitalPageList[index].address + '의 검색 결과가 없거나 기타 네트워크 에러');
						}
						
						var result = response.result;
						
						var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
						makeMarker(map, myaddr, index, hospitalPageList[index]);
					};

				}


				//map에 hospital들의 위치 마커를 찍는다.
				for(var i = 0; i< hospitalPageList.length; i++){
					
					//Marker를 찍기 위함 TODO 이걸 데이터에 저장하는 로직을 넣어야 빨라질 것 같다.
					naver.maps.Service.geocode({address: hospitalPageList[i].address}, mapCallback(i));

				}

			});


		}
	}


});


