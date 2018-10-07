







var xhr = new XMLHttpRequest();
var url = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire'; /*URL*/
var queryParams = '?' + encodeURIComponent('ServiceKey') + '='+'lhXf2oCnLCrgBwsv5mwJVn1Z5iwWR2yZyyqR7EM57inYS166PJ7VTP6GyMKWbMV8HRv5psSOYqeXafMzUUZAgw%3D%3D'; /*Service Key*/




xhr.open('GET', url + queryParams);

xhr.onreadystatechange = function () {
    if (this.readyState == 4) {
        alert('Status: '+this.status+' Headers: '+JSON.stringify(this.getAllResponseHeaders())+' Body: '+this.responseText);
    }
};

xhr.send('');







