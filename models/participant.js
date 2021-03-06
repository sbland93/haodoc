var mongoose = require('mongoose');


var participantSchema = mongoose.Schema({

    participantName: String,
    gender: String,
    wechatID: String,
    phone : String,
    memo: String,
    eventName: String,
    remarks: String,
	updated_at : { type: Date, default: Date.now },

});



var Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;