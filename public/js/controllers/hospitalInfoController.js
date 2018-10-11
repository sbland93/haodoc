
var url =  window.location.pathname;

var hospitalID = url.replace("/hospital/", "");



var app = new Vue({

	el : "#app",
	
	data : {

		hospital : '',
		hospitalID : hospitalID,
		havePhoto : false,
		updateToggle : false,
		reviewToggle: false,
		
		newReview : {

			star: '',
			treatment: '',
			content : '',
			weChat: '',
			password: '',
		
		},

		updateSubjects : [

		],

	},
	
	computed : {
		//fullAddress를 리턴해주는 함수.
		fullAddress : function(){

			var space = " ";
			return this.hospital.city + space + this.hospital.district + space + this.hospital.address;

		},

	},

	filters: {
		//ToDO
		makeTimeForm: function(value){
		   
			console.log(value);

			var timeForm = value + "!!"
			
			return timeForm;
		
		},
	
	},
	
	mounted : function(){
		
		this.getHospital(this.hospitalID);

	},

	
	
	methods: {
		
		//TODO
		/*photoHref : function(photo_name){

			return "/images/hospital/" + photo_name+".JPG";

		},*/

		addReview: function(){

			var self = this;
			if(self.hospital.reviews === undefined){
				self.hospital.reviews = [];
			}
			var obj = self.newReview;
			if(Array.isArray(self.hospital.reviews)){
				for(var index in obj) { 
					console.log(obj[index]);
				    if(obj[index] === '') {console.log("here"); return;}
				}
				self.hospital.reviews.push(obj);
			}
			updateHospital(hospitalID, self.hospital).then(function(rtnData){
				console.log("반영");
				console.log(rtnData);
			});

		
		},

		updateHospital: function(){

			this.hospital.subjects = this.hospital.subjects.split(",");
			console.log("this.hospital.subjects", this.hospital.subjects);
			updateHospital(hospitalID, this.hospital).then(function(rtnData){
				alert("반영되었습니다");
				this.updateToggle = false;
			});

		},

		toggleReview: function(){
			var pass=prompt("Password")
			if(pass !== "inspire") return;
			this.reviewToggle = !this.reviewToggle;
			console.log(this.reviewToggle);
			return;
		},

		toggleUpdate: function(){
			var pass=prompt("Password")
			if(pass !== "inspire") return;
			this.updateToggle = !this.updateToggle;
			console.log(this.updateToggle)
			return;
		},

		//monStart(1000)을 10:00으로 만들기 위해 String을 입력받으면 세번째에 : 을 추가해 리턴해주는 함수.
		makeTimeForm: function(timeString){
			console.log(timeString);
			var timeForm = timeString.slice(0, 2) + " : " + timeString.slice(2);
			return timeForm;
		},

		photoHref: function(index){
			var rtnValue = "/images/hospital/" + this.hospital.neighborhood + "_" + this.hospital.name + "_0" + index + ".JPG"; 
			return  rtnValue;
		},

		//index가 0인지 확인
		isFirst : function(index){
			console.log(index ==0);
			return index == 0;
		},

		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(id){
			
			var self = this;
			var map = new naver.maps.Map('map');
			getHospital(id).then(function(_hospital){

				self.hospital = _hospital;
				console.log("self.hospital.reviews", self.hospital.reviews);
				var myaddress = self.hospital.address;

				//self.havePhoto = _hospital.photo.length > 0;
				self.havePhoto = _hospital.photo > 0;

				naver.maps.Service.geocode({address: myaddress}, function(status, response) {
  
					if (status !== naver.maps.Service.Status.OK) {
					  
						return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');

					}

					var result = response.result;

					var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);

					map.setCenter(myaddr);

					var marker = new naver.maps.Marker({
						position: myaddr,
						map: map,
						icon: {
				        	url: '/images/pin/0.png',
				        }
					});
				  
				});


			}).catch(function(err){
				
				console.log(err);
			
			});
		}
	}

})