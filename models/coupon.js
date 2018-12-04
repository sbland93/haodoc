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
    price : Number,
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
