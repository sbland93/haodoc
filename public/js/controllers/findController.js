//HospitalData를 script에 포함시키는 것이 선행 되어야 한다.


/*  Marker를 찍는 함수  */
const makeMarker = function(map, position) {

    var marker = new naver.maps.Marker({
        map: map,
        position: position,
    });

    return marker;

}

//Vue 앱 만들기.
var app = new Vue({

	el : "#app",
	
	data : {

		hospitals : [],
		city : "서울특별시",
		district : "서대문구",
		neighborhood : "선택없음",
		subject : "선택없음",
		subway : "",
		addressRender : true,
		subwayRender : false,
		districtList : districtList,
		subjectList : subjectList,
	
	},
	
	computed : {

		//변화에 대응해 자동으로 query를 만들어준다.
		query : function(){

			var computedQuery = { 
			
				city : this.city,
				district : this.district, 
				neighborhood : this.neighborhood,
				subject : this.subject,

			};

			for(var key in computedQuery){

				if ( computedQuery[key] === "선택없음" ){

					delete computedQuery[key];
				
				}
			
			}

			return computedQuery;

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


		district : function(){

			this.neighborhood = "선택없음";
			this.getHospital(this.query);

		},

		neighborhood : function(newNeighbor){

			this.getHospital(this.query);
		
		},

		subject : function(newSubject){

			this.getHospital(this.query);

		}

	},
	
	methods: {

		//handlebars랑 겹쳐서, href를만드는 것을 method로 뺌. 방법을 강구해봐야할 듯.
		hospitalInfoHref : function(id){
		
			return "/hospital/"+id;
		
		},
		//역 검색 실시할 때, 사용하는 method.
		searchSubway : function(){

			//사용자가 적은것이 역의 일부 일 수 있으므로, 정규표현식을 활용한다.
			const subwayQuery = { "subway": { "$regex": this.subway, "$options": "i" } };
			this.getHospital(subwayQuery);

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
			return hospitalObj.city + space + hospitalObj.district + space + hospitalObj.neighborhood + space + hospitalObj.address ;

		},
		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(query){
			
			var self = this;

			console.log("getHospitals");

			var map = new naver.maps.Map('map', {

				center: new naver.maps.LatLng(shinchonX, shinchonY),

			})

			getHospitals(query).then(function(_hospitals){

				self.hospitals = _hospitals;

				//map에 hospital들의 위치 마커를 찍는다.
				for(var index in self.hospitals){
					//Marker를 찍기 위함 TODO 이걸 데이터에 저장하는 로직을 넣어야 빨라질 것 같다.
					naver.maps.Service.geocode({address: self.hospitals[index].address}, function(status, response) {
						
						if (status !== naver.maps.Service.Status.OK) {
							return alert(self.hospitals[index].address + '의 검색 결과가 없거나 기타 네트워크 에러');
						}
						
						var result = response.result;
						
						var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
						
						makeMarker(map, myaddr);

					});
		
				}


			}).catch(function(err){
				
				console.log(err);
			
			});
		}
	}


});





