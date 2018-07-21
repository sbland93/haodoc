var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: String,
	phone: String,
	wechatID: String,
	birthDay : String,
	updated_at: {type: Date, default: Date.now },
});


var User = mongoose.model('User', userSchema);
module.exports = User;