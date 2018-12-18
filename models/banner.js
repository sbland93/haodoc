var mongoose = require('mongoose');


var bannerSchema = mongoose.Schema({
    
    bannerImage: String,
    mobileImage : String,
    url : String,
    remarks : String,
    category : {
        type: String,
        enum: ['MAIN', 'EVENT'],
    },
    updated_at : { type: Date, default: Date.now },

});


var Banner = mongoose.model('Banner', bannerSchema);

module.exports = Banner;




