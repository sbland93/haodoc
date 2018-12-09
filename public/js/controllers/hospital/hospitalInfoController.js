
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
		photosToggle: false,
		newReview : {

			star: '',
			treatment: '',
			content : '',
			weChat: '',
			password: '',
		
		},

		photos: [
			""
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
			
			if(!!value){
				var hour = value.substring(0,2);
				var minute = value.substring(2,4);
				var timeForm = hour + ":" + minute;
			}else{
				var timeForm = value;
			}
			
			return timeForm;
		
		},
	
	},
	
	mounted : function(){
		var self = this;
		this.getHospital(this.hospitalID);

	},

	
	
	methods: {
		
		//TODO
		imageHref : function(photo_name){

			return "/images/hospital/" + photo_name;

		},

		addReview: function(){

			var self = this;
			if(self.hospital.reviews === undefined){
				self.hospital.reviews = [];
			}
			var obj = self.newReview;
			if(Array.isArray(self.hospital.reviews)){
				for(var index in obj) { 
				    if(obj[index] === '') {console.log("here"); return;}
				}
				self.hospital.reviews.push(obj);
			}
			updateHospital(hospitalID, self.hospital).then(function(rtnData){
			});

		
		},
		//subject를 넣기 위한 칸을 만들어준다.
		addSubject: function(){
			var self = this;

			self.hospital.subjects.push("");
		},

		//X를 클릭하면 그 과목이 삭제된다. index를 찾고, index에 해당하는 엘리먼트를 삭제한다.
		deleteSubject: function(subject){
			
			var self = this;
			var subjects = self.hospital.subjects;
			var index = subjects.indexOf(subject);
			if (index !== -1) subjects.splice(index, 1);

		},

		addKeyword : function(){
		
			var self = this;
			self.hospital.keywords.push("");
		
		},
		//X를 클릭하면 그 키워드가 삭제된다. index를 찾고, index에 해당하는 엘리먼트를 삭제한다.
		deleteKeyword: function(keyword){
			
			var self = this;
			var keywords = self.hospital.keywords;
			var index = keywords.indexOf(keyword);
			if (index !== -1) keywords.splice(index, 1);

		},

		addPhoto: function(event){
			event.preventDefault();
			var self = this;
			self.photos.push("");

		},

		deletePhoto: function(index, event){
			event.preventDefault();
			var self = this;
			var photos = self.photos;
			photos.splice(index, 1);
		},
		
		updateHospital: function(){

			var self = this;
			updateHospital(hospitalID, self.hospital).then(function(rtnData){
				alert("반영되었습니다");
				self.updateToggle = false;
			});

		},
		changePhotos: function(event){
			event.preventDefault();
            var self = this;
            var newPhoto = new FormData();
            for (var i = 0; i < self.photos.length; i++) {
            	//파일이 정의 되어 있으면 append 한다.
            	if($("#"+i)[0].files[0] !== undefined){
					newPhoto.append("photos", $("#"+i)[0].files[0]);
            	}
            }
            //api함수
            addPhotos(hospitalID, newPhoto).then(function(rtn){
            	if(rtn.success){
            		alert("성공입니다.")
            		self.photosToggle = false;
            		self.getHospital(self.hospitalID);
            	}else{
            		alert("에러입니다.")
            		self.photosToggle = false;
            	}
            });
        },
        removePhoto: function(photoName, event){
        	event.preventDefault();
        	var self = this;
        	deletePhoto(hospitalID, {"photoName": photoName}).then(function(rtn){
        		if(rtn.success){
            		alert("성공입니다.")
            		self.photosToggle = false;
            		self.getHospital(self.hospitalID);
            	}else{
            		alert("에러입니다.")
            		self.photosToggle = false;
            	}
        	});
        },
		toggleReview: function(){
			var pass=prompt("Password")
			if(pass !== "inspire") return;
			this.reviewToggle = !this.reviewToggle;
			return;
		},

		toggleUpdate: function(){
			var pass=prompt("Password")
			if(pass !== "inspire") return;
			this.updateToggle = !this.updateToggle;
			return;
		},

		togglePhotos: function(){
			var pass=prompt("Password")
			if(pass !== "inspire") return;
			this.photosToggle = !this.photosToggle;
			return;
		},

		//monStart(1000)을 10:00으로 만들기 위해 String을 입력받으면 세번째에 : 을 추가해 리턴해주는 함수.
		makeTimeForm: function(timeString){
			var timeForm = timeString.slice(0, 2) + " : " + timeString.slice(2);
			return timeForm;
		},

		photoHref: function(index){
			var rtnValue = "/images/hospital/" + this.hospital.neighborhood + "_" + this.hospital.name + "_0" + index + ".JPG"; 
			return  rtnValue;
		},

		//index가 0인지 확인
		isFirst : function(index){
			return index == 0;
		},

		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(id){
			
			var self = this;
			var map = new naver.maps.Map('map');
			getHospital(id).then(function(_hospital){

				self.hospital = _hospital;
				if(!_hospital.keywords) _hospital.keywords = [];
				
				var myaddress = self.hospital.address;

				//self.havePhoto = _hospital.photo.length > 0;
				self.havePhoto = _hospital.photos.length > 0;
				//TODO 안에 지금 위도 경도가 있으니깐 그걸 활용하면 된다.
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