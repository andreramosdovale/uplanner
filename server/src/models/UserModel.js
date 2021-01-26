const mongoose = require('../config/mongooseConnector');

const UserSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    email: String,
    register_date: Date,
    token: String
},{ collection: 'users' });

module.exports = mongoose.model('User', UserSchema);