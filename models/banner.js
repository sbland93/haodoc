var mongoose = require('mongoose');


var bannerSchema = mongoose.Schema({
    
    bannerImage: String,
    mobileImage : String,
    url : String,
    remarks : String,
    category : {
        type: String,
        enum: ['MAIN', 'EVENT', 'BOARD'], //Main페이지 배너랑 , Event페이지, 커뮤니티배너,  배너 따로 관리하려고
    },
    updated_at : { type: Date, default: Date.now },

});


var Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;




