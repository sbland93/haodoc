
var xhr = new XMLHttpRequest();

var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncFullDown'; /*URL*/

var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'서비스키'; /*Service Key*/

queryParams += '&' + encodeURIComponent('ServiceKey') + '=' + encodeURIComponent('-'); /*공공데이터포털에서 받은 인증키*/
queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /*페이지번호*/
queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /*한 페이지 결과 수*/
xhr.open('GET', url + queryParams);

xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+' Headers: '+JSON.stringify(this.getAllResponseHeaders())+' Body: '+this.responseText);
    }
};

xhr.send('');