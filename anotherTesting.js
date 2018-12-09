
var fs = require("fs");

var path = require('path');

console.log(path.join(__dirname + "/public/images/event"));


fs.readdir(path.join(__dirname + "/public/images/event"), function(error, fileList){
	console.log(fileList);
});