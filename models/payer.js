

var mongoose = require('mongoose');
var Coupon = require('./coupon.js');

var payerSchema = mongoose.Schema({

    payerName: String,
	coupon: { type: mongoose.Schema.Types.ObjectId, ref: 'Coupon'}, //쿠폰의 아이디를 저장한다.
	email: String,
	englishName: String,
	chineseName: String, 
	phone: String,
	wechatID: String,
	birthDay : String,
	gender : String,
	remarks: String,
	updated_at: {type: Date, default: Date.now },

});



var Payer = mongoose.model('Payer', payerSchema);

module.exports = Payer;