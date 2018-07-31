var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	englishName: String,
	chineseName: String, 
	phone: String,
	wechatID: String,
	birthDay : String,
	gender : String,
	updated_at: {type: Date, default: Date.now },
});


var User = mongoose.model('User', userSchema);
module.exports = User;