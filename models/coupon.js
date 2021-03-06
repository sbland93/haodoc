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
    originalPrice : {type: Number, default: 0}, //원래가격
    price : {type: Number, default: 0},
    isDeposit : Boolean, //예약금 모델인지 여부
    deposit : Number, //예약금 가격
    categorys : { type: [ String ], default: [] },
    highCategorys: { type: [ String ], default: []},
    middleCategorys: { type: [ String ], default: []},
    lowCategorys: { type: [ String ], default: []},
    hospitalName: String,
    subway: String,
    address: String,
    thumbnailImage: String,
    couponImage: [ String ],
    remarks : String,

    payments : {type: Number, default: 0}, //예약자수, 결제건수
    views : {type: Number, default: 0}, //조회수
    
    realViews : {type: Number, default: 0}, //실 조회수
    realPayments : {type: Number, default: 0}, //실 결제수 
       
    questions : [ questionSchema ],
	updated_at : { type: Date, default: Date.now },

});


var Coupon = mongoose.model('Coupon', couponSchema);

module.exports = Coupon;




