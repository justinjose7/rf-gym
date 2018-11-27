const mongoose = require('mongoose')

var Schema = mongoose.Schema;

var gymMemberSchema = new Schema({
    member_name: String,
    member_id: String,
    date_started: Date,
    date_finished: Date
}, {collection:"Machine"});

module.exports = mongoose.model('gymMember', gymMemberSchema);
