
var map = new naver.maps.Map('map');
      var myaddress = '서대문구  ';// 도로명 주소나 지번 주소만 가능 (건물명 불가!!!!)
      naver.maps.Service.geocode({address: myaddress}, function(status, response) {
          if (status !== naver.maps.Service.Status.OK) {
              return alert(myaddress + '의 검색 결과가 없거나 기타 네트워크 에러');
          }
          var result = response.result;
          // 검색 결과 갯수: result.total
          // 첫번째 결과 결과 주소: result.items[0].address
          // 첫번째 검색 결과 좌표: result.items[0].point.y, result.items[0].point.x
          var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
          map.setCenter(myaddr); // 검색된 좌표로 지도 이동
          // 마커 표시
          var marker = new naver.maps.Marker({
            position: myaddr,
            map: map
          });
          // 마커 클릭 이벤트 처리
          console.log(result);
          naver.maps.Event.addListener(marker, "click", function(e) {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
          });
          // 마크 클릭시 인포윈도우 오픈
          var infowindow = new naver.maps.InfoWindow({
              content: '<h4> [네이버 개발자센터]</h4><a href="https://developers.naver.com" target="_blank"><img src="https://developers.naver.com/inc/devcenter/images/nd_img.png"></a>'
          });
      });


/*
centerString = function(){

	var centerString = "";
	
	if(subwayRender === true){

		centerString += this.subwayDic[this.subway];
	
	}else{ //

		centerString += this.district;
		centerString += " ";
		centerString += this.neighborhood;

	}

	return centerString;
}




//map의 중심을 잡기 위해 위,경도를 확인 후 Setting.
naver.maps.Service.geocode({ address : this.centerString }, function(status, response){

	var result = response.result;

	var centerX = result.items[0].point.x,
		centerY = result.items[0].point.y;

	var map = new naver.maps.Map('map', {

		center: new naver.maps.LatLng(centerX, centerY),

	});

	//index를 closer로 저장하기 위해 callback Function을 리턴하는 함수를 만든다.
	var mapCallback = function(index){
		
		return function(status, response) {
			if (status !== naver.maps.Service.Status.OK) {
				return alert(hospitalPageList[index].address + '의 검색 결과가 없거나 기타 네트워크 에러');
			}
			
			var result = response.result;
			
			var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
			makeMarker(map, myaddr, index);
		};

	}


	//map에 hospital들의 위치 마커를 찍는다.
	for(var i = 0; i< hospitalPageList.length; i++){
		
		//Marker를 찍기 위함 TODO 이걸 데이터에 저장하는 로직을 넣어야 빨라질 것 같다.
		naver.maps.Service.geocode({address: hospitalPageList[i].address}, mapCallback(i));

	}

});







var map = new naver.maps.Map('map', {

	center: new naver.maps.LatLng(SHINCHON_X, SHINCHON_Y),

});

//index를 closer로 저장하기 위해 callback Function을 리턴하는 함수를 만든다.
var mapCallback = function(index){
	
	return function(status, response) {
		if (status !== naver.maps.Service.Status.OK) {
			return alert(hospitalPageList[index].address + '의 검색 결과가 없거나 기타 네트워크 에러');
		}
		
		var result = response.result;
		
		var myaddr = new naver.maps.Point(result.items[0].point.x, result.items[0].point.y);
		makeMarker(map, myaddr, index);
	};

}

//map에 hospital들의 위치 마커를 찍는다.
for(var i = 0; i< hospitalPageList.length; i++){
	
	//Marker를 찍기 위함 TODO 이걸 데이터에 저장하는 로직을 넣어야 빨라질 것 같다.
	naver.maps.Service.geocode({address: hospitalPageList[i].address}, mapCallback(i));

}

*/
