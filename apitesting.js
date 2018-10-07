

var fs = require('fs');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();


var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire';
//var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown';
var queryParams = '?' + encodeURIComponent('ServiceKey') + '=lhXf2oCnLCrgBwsv5mwJVn1Z5iwWR2yZyyqR7EM57inYS166PJ7VTP6GyMKWbMV8HRv5psSOYqeXafMzUUZAgw%3D%3D'; /* Service Key*/

var city = "서울특별시";
var district = "서대문구";


queryParams += '&' + encodeURIComponent('Q0') + '=' + encodeURIComponent(city); /* */
queryParams += '&' + encodeURIComponent('Q1') + '=' + encodeURIComponent(district); /* */
queryParams += '&' + encodeURIComponent('QZ') + '=' + encodeURIComponent('C'); /* */
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('1000'); /* */
queryParams += '&' + encodeURIComponent('ORD') + '=' + encodeURIComponent('NAME'); /* */

// name: String, 
// city: String,
// district : String,
// address : String,
// tel : String,
// category : String, //의원, 병원 등

// remarks: String,
// hpid: String,

// langitude: Number, //위도 경도
// latitude : Number,

// monStart: Number, //월~금 진료시간
// monClose: Number,
// tueStart: Number,
// tueClose: Number,
// wedStart: Number,
// wedClose: Number,
// thuStart: Number,
// thuClose: Number,
// friStart: Number,
// friClose: Number,
// satStart: Number,
// satClose: Number,
// sunStart: Number,
// sunClose: Number,
// holStart: Number,
// holClose: Number,

var allData = [];


request({

    url: url + queryParams,
    method: 'GET'

}, function (error, response, body) {
    
    parser.parseString(body, function(err, result){

    	var items = result.response.body[0].items[0].item;
    	
    	var i = 0;

		console.log(items[0]);


    	while(true){

    		if(items[i] == undefined){
                console.log(i);
                break;
            }

            var newData = {};
            newData["name"] = items[i].dutyName[0];
            newData["city"] = city;
            newData["district"] = district;
            newData["address"] = items[i].dutyAddr[0].replace(city + " " + district + " ", ""); //city + district => "서울특별시 서대문구 " 삭제 진행
    		newData["tel"] = items[i].dutyTel1[0];
            newData["category"] = items[i].dutyDivNam[0];
            
            if(items[i].dutyEtc) newData["remarks"] = items[i].dutyEtc[0];
            
            newData["hpid"] = items[i].hpid[0];

            newData["latitude"] = Number(items[i].wgs84Lat[0]);
            newData["longitude"] = Number(items[i].wgs84Lon[0]);


            if(items[i].dutyTime1s && items[i].dutyTime1c){
                newData["monStart"] = items[i].dutyTime1s[0];
                newData["monClose"] = items[i].dutyTime1c[0];
            }

            if(items[i].dutyTime2s && items[i].dutyTime2c){
                newData["tueStart"] = items[i].dutyTime2s[0];
                newData["tueClose"] = items[i].dutyTime2c[0];
            }

            if(items[i].dutyTime3s && items[i].dutyTime3c){
                newData["wedStart"] = items[i].dutyTime3s[0];
                newData["wedClose"] = items[i].dutyTime3c[0];
            }

            if(items[i].dutyTime4s && items[i].dutyTime4c){
                newData["thuStart"] = items[i].dutyTime4s[0];
                newData["thuClose"] = items[i].dutyTime4c[0];
            }

            if(items[i].dutyTime5s && items[i].dutyTime5c){
                newData["friStart"] = items[i].dutyTime5s[0];
                newData["friClose"] = items[i].dutyTime5c[0];
            }

            if(items[i].dutyTime6s && items[i].dutyTime6c){
                newData["satStart"] = items[i].dutyTime6s[0];
                newData["satClose"] = items[i].dutyTime6c[0];
            }

            if(items[i].dutyTime7s && items[i].dutyTime7c){
                newData["sunStart"] = items[i].dutyTime7s[0];
                newData["sunClose"] = items[i].dutyTime7c[0];
            }

            if(items[i].dutyTime8s && items[i].dutyTime8c){
                newData["holStart"] = items[i].dutyTime8s[0];
                newData["holClose"] = items[i].dutyTime8c[0];
            }
        
    		i+=1;

            allData.push(newData);


    	}

        console.log(allData);

        var processed_data = JSON.stringify(allData);

        fs.writeFile('서대문구 병원 데이터.js', processed_data, 'utf8', function(err) {
            console.log('비동기적 파일 쓰기 완료');
        });


    
    })

});




