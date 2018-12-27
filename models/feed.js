var mongoose = require('mongoose');


var feedSchema = mongoose.Schema({
    
    feedImage: String,
    mobileImage : String,
    title: String,
    content: String,
    url: String,
    hashtags : [ String ],
    views : { type: Number, default: 0 },
    remarks: String,
    updated_at: { type: Date, default: Date.now },

});


var Feed = mongoose.model('Feed', feedSchema);

module.exports = Feed;




