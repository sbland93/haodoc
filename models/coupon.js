var mongoose = require('mongoose');


//응답스키마
var answerSchema = mongoose.Schema({

    name : String,
    content : String,
    password: String,
    updated_at : { type : Date, default : Date.now },

});


var questionSchema = mongoose.Schema({

	name : String,
	wechatID : String,
	password : String,
	content : String,
    answer : { type: answerSchema },
	updated_at : { type: Date, default: Date.now },

});

var couponSchema = mongoose.Schema({
    
    couponName: String,
    couponRange: String,
    originalPrice : Number, //원래가격
    price : Number,
    isDeposit : Boolean, //예약금 모델인지 여부
    deposit : Number, //예약금 가격
    categorys : { type: [ String ], default: [] },
    hospitalName: String,
    subway: String,
    address: String,
    thumbnailImage: String,
    couponImage: [ String ],
    password : String,
    remarks : String,
    questions : [ questionSchema ],
	updated_at : { type: Date, default: Date.now },

});


var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;




