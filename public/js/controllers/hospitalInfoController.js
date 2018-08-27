






var app = new Vue({

	el : "#app",
	
	data : {

		hospital : ''
	
	},
	
	computed : {
		//fullAddress를 리턴해주는 함수.
		fullAddress : function(){

			return this.hospital.city + this.hospital.district + this.hospital.neighborhood + this.hospital.address;

		},

	},
	
	mounted : function(){
		
		this.getHospital(this.hospital.id);

	},
	
	methods: {

		//Hospital의 Data들을 가져오고 map에 해당하는 데이터를 표시해준다.
		getHospital : function(id){
			
			var self = this;

			var map = new naver.maps.Map('map');
			var myaddress = this.hospital.;

			getHospital(id).then(function(_hospital){

				self.hospital = _hospital;

				naver.maps.Service.geocode({address: myaddress}, function(status, response) {
  
					if (status !== naver.maps.Service.Status.OK) {
					  
					  return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');

					}

					var result = response.result;

					var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);

					map.setCenter(myaddr);

					var marker = new naver.maps.Marker({
						position: myaddr,
						map: map
					});
				  
				});


			}).catch(function(err){
				
				console.log(err);
			
			});
		}
	}

})