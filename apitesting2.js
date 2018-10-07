var credentials = require('./credentials.js');
var request = require('request');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

//몽구스 설정.
var mongoose = require('mongoose');
var opts = {
	keepAlive: 1,
	useNewUrlParser: true
};
mongoose.Promise = global.Promise;


mongoose.connect(credentials.mongo.development.connectionString, opts);

var Hospital = require('./models/hospital.js');

// Hospital.remove({}, function(err){

// });

var subjectDictionary = {

	"이비인후과" : "耳鼻喉科", //이비인후과
	"내과" : "内科", //내과
	"피부과" : "皮肤科", //피부과
	"치과" : "牙科",
	"안과": "眼科",
	"정형외과": "骨科",
	"산부인과": "妇产科",
	"재활의학과": "康复科",
	"소아청소년과": "小儿科",
	"가정의학과": "家庭医学科",
	"신경외과": "神经外科",
	"외과": "外科",
	"비뇨기과": "泌尿科",
	"영상의학과": "影像科",
	"병리과":"病理科",
	"마취통증의학과":"麻醉科",
	"신경과":"神经科",
	"진단검사의학과":"诊断检查科",
	"응급의학과":"应急室",
	"성형외과" : "整形外科"

}

//received_obj[received_attr_string] 에 passing_obj[passing_attr_string]이 있으면 붙인다.
var pushIfExist = function(received_obj, received_attr_string , passing_obj, passing_attr_string){
	
	if(passing_obj[passing_attr_string]){
		received_obj[received_attr_string] = passing_obj[passing_attr_string][0];
	}

	return;

}

//시간정보가 있는지 확인하고 있다면 item에 붙인다.
var fillTimeAttr = function(full_data_array, k, item){


    if(item.dutyTime1s && item.dutyTime1c){
        full_data_array[k]["monStart"] = item.dutyTime1s[0];
        full_data_array[k]["monClose"] = item.dutyTime1c[0];
    }

    if(item.dutyTime2s && item.dutyTime2c){
        full_data_array[k]["tueStart"] = item.dutyTime2s[0];
        full_data_array[k]["tueClose"] = item.dutyTime2c[0];
    }

    if(item.dutyTime3s && item.dutyTime3c){
        full_data_array[k]["wedStart"] = item.dutyTime3s[0];
        full_data_array[k]["wedClose"] = item.dutyTime3c[0];
    }

    if(item.dutyTime4s && item.dutyTime4c){
        full_data_array[k]["thuStart"] = item.dutyTime4s[0];
        full_data_array[k]["thuClose"] = item.dutyTime4c[0];
    }

    if(item.dutyTime5s && item.dutyTime5c){
        full_data_array[k]["friStart"] = item.dutyTime5s[0];
        full_data_array[k]["friClose"] = item.dutyTime5c[0];
    }

    if(item.dutyTime6s && item.dutyTime6c){
        full_data_array[k]["satStart"] = item.dutyTime6s[0];
        full_data_array[k]["satClose"] = item.dutyTime6c[0];
    }

    if(item.dutyTime7s && item.dutyTime7c){
        full_data_array[k]["sunStart"] = item.dutyTime7s[0];
        full_data_array[k]["sunClose"] = item.dutyTime7c[0];
    }

    if(item.dutyTime8s && item.dutyTime8c){
        full_data_array[k]["holStart"] = item.dutyTime8s[0];
        full_data_array[k]["holClose"] = item.dutyTime8c[0];
    }


}



//pageNo에 따라 다섯개(다섯개가 초당 트랜젝션의 한계인것 같다)의 병원 데이터를 파싱한다. (건강보험심사평가원 - 병원정보서비스 API 활용)
var getHospitalDefault = function(pageNo, full_data_array){
	
	console.log("@@ page "+ pageNo + " has just started now hope it will done well.....");
	//병원 기본 정보
	var url_hospital_default = 'http://apis.data.go.kr/B551182/hospInfoService/getHospBasisList';

	var query_for_default = '?' + encodeURIComponent('ServiceKey') + '=lhXf2oCnLCrgBwsv5mwJVn1Z5iwWR2yZyyqR7EM57inYS166PJ7VTP6GyMKWbMV8HRv5psSOYqeXafMzUUZAgw%3D%3D'; /* Service Key*/
	query_for_default += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent(pageNo); /* 페이지번호 */
	query_for_default += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('5'); /* 한 페이지 결과 수 */
	query_for_default += '&' + encodeURIComponent('sidoCd') + '=' + encodeURIComponent('110000');  /*시도코드  110000 - 서울 */
	query_for_default += '&' + encodeURIComponent('zipCd') + '=' + encodeURIComponent('2070'); /* 2010:종합병원, 2030:병원, 2040:요양병원, 2050:치과, 2060:한방, 2070:의원, 2080:보건기관, 2090:조산원 */


	return new Promise(function(resolve, reject){
		

		request({

		  
		    url: url_hospital_default + query_for_default,
		    method: 'GET'


		}, function (error, response, body) {
		   
				    
		    parser.parseString(body, function(err, result){

		    	var items = result;
		    	var parsing_data = items.response.body[0].items[0].item;
		    	

		    	for (var i = parsing_data.length - 1; i >= 0; i--) {

		    		var obj = { city: "서울특별시" };

			    	pushIfExist(obj, "address", parsing_data[i], "addr");
			    	pushIfExist(obj, "homepage", parsing_data[i], "hospUrl");
			    	pushIfExist(obj, "district", parsing_data[i], "sgguCdNm");
			    	pushIfExist(obj, "neighborhood", parsing_data[i], "emdongNm");
			    	pushIfExist(obj, "tel", parsing_data[i], "telno");
			    	pushIfExist(obj, "xPos", parsing_data[i], "XPos");
			    	pushIfExist(obj, "yPos", parsing_data[i], "YPos");
			    	pushIfExist(obj, "name", parsing_data[i], "yadmNm");
			    	pushIfExist(obj, "hospitalID", parsing_data[i], "ykiho");
			    	obj["address"] = obj["address"].replace("서울특별시 " + obj["district"] + " ", "");
			    	full_data_array.push(obj);
			    	//newData["address"] = items[i].dutyAddr[0].replace(city + " " + district + " ", ""); //city + district => "서울특별시 서대문구 " 삭제 진행

		    	}

		    	resolve();

		    })

		});
	});
	

}


//Hospital의 Detail한 정보들을 가져온다( 진료과목 )
var getHospitalDetail = function(k, full_data_array){
	
	//병원 상세 정보 요청 url
	var url_hospital_detail = 'http://apis.data.go.kr/B551182/medicInsttDetailInfoService/getMdlrtSbjectInfoList';

	var query_for_detail = '?' + encodeURIComponent('ServiceKey') + '=lhXf2oCnLCrgBwsv5mwJVn1Z5iwWR2yZyyqR7EM57inYS166PJ7VTP6GyMKWbMV8HRv5psSOYqeXafMzUUZAgw%3D%3D'; /* Service Key*/
	query_for_detail += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1');   
	query_for_detail += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* 한 페이지 결과 수 */
	query_for_detail += '&' + encodeURIComponent('ykiho') + '=' + encodeURIComponent(full_data_array[k]["hospitalID"]); /* 암호화된 요양기호 */
		
		
	return new Promise(function(resolve, reject){

		request({

		    url: url_hospital_detail + query_for_detail,
		    method: 'GET'

		}, function (error, response, body) {

		    parser.parseString(body, function(err, result){

		    	var items = result;
		    	var detail_data = items.response.body[0].items[0];
		    	if(detail_data.item){
		    		
		    		var subject_list = detail_data.item;
		    		var subject_list_array = [];
		    		//진료과목을 돌면서, '내과', '이비인후과', '신경과' 등의 키워드만 빼서, subject_list_array
		    		for (var i = subject_list.length - 1; i >= 0; i--) {

		    			if(subjectDictionary[subject_list[i].dgsbjtCdNm[0]]){
		    				var _subject = subjectDictionary[subject_list[i].dgsbjtCdNm[0]]
			    			subject_list_array.push(_subject);
		    			};

		    		
		    		}

		    		full_data_array[k]["subjects"] = subject_list_array;

		    	}
		    	
		    	resolve();
		    })

		});
	})
	


}


// 국립중앙의료원(전국 병.의원 찾기) API를 활용해서 full_data_array를 돌며 이름, 시, 구가 일치하는 병원의 데이터를 찾아서 붙인다.
var getHospitalTime = function (k, full_data_array){
	
	//국립중앙의료원 API
	var url_hospital_time = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire';

	var hospital_time_param = '?' + encodeURIComponent('ServiceKey') + '=lhXf2oCnLCrgBwsv5mwJVn1Z5iwWR2yZyyqR7EM57inYS166PJ7VTP6GyMKWbMV8HRv5psSOYqeXafMzUUZAgw%3D%3D'; /* Service Key*/
	hospital_time_param += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* 페이지번호 */

	hospital_time_param += '&' + encodeURIComponent('Q0') + '=' + encodeURIComponent("서울특별시"); /* 페이지번호 */
	hospital_time_param += '&' + encodeURIComponent('Q1') + '=' + encodeURIComponent(full_data_array[k]["district"]); /* 페이지번호 */
	hospital_time_param += '&' + encodeURIComponent('QN') + '=' + encodeURIComponent(full_data_array[k]["name"]); /* 한 페이지 결과 수 */

	return new Promise(function(resolve, reject){

		request({

		    url: url_hospital_time + hospital_time_param,
		    method: 'GET'

		}, function (error, response, body) {

		    parser.parseString(body, function(err, result){

		    	var items = result;
		    	var detail_data = items.response.body[0].items[0];
		    	
		    	if(detail_data.item){

		    		var item = detail_data.item[0];
		    		
		    		
		    		if(item.dutyEtc){
		    			full_data_array[k]["remarks"] = item.dutyEtc[0];
		    		}

		    		fillTimeAttr(full_data_array, k, item);

		    	}

		    	resolve();

		    })

		});

	});
	
}









//num_of_hospital 만큼 완성된 병원 데이터를 만드는 함수.
var doingPageN = function(pageNo){

	if(pageNo == 2000) return;

	var full_data_array = [];


	//기본 Hospital Data를 까는 것이 완료되었는지.
	getHospitalDefault(pageNo, full_data_array).then(function(){
		
		var promiseArr = [];

		for (var k = full_data_array.length - 1; k >= 0; k--) {
					
			promiseArr.push(getHospitalDetail(k, full_data_array));
			promiseArr.push(getHospitalTime(k, full_data_array));

		}

		Promise.all(promiseArr).then(function(){
			


			//Seeding Hospital Promise
			var seedHospital = new Promise(function(resolve, reject){
				Hospital.create(full_data_array, function(err, hospitals){
					if(err) reject(err);
					resolve(hospitals);
				});
			});

			//Answer with Seed Hospital
			seedHospital.then(function(){
				
				console.log("@@ @@ page "+ pageNo +" has just finished.. hope Next Page will also..!");
				pageNo += 1;
				doingPageN(pageNo);

			})
			.catch(function(err){
				
				console.log("@@ @@ page "+ pageNo +" has failed @@@@@@@@@@@@ ");
				throw new Error("Data initiating All, Fail");
			
			});


		});
	
	});

}




doingPageN(1667);



