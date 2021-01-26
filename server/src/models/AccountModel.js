const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)

const AccountSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    user_account_id: {type:String, required: true, unique:false},
    user_account_email: {type:String, required: true, unique:false},
    nickname: String,
    account_balance: {type: Number, default: 0},
    created_at: { type: Date, default: Date.now, unique:false},
    active: {type: Boolean, default: true}
},{ collection: 'account' })

AccountSchema.plugin(autoIncrement.plugin, {
    model: 'account',
    field: '_id',
    startAt: 1,
    incrementBy: 1
})

let Account = mongoose.model('account', AccountSchema);
Account.nextCount(function(err, count) {

    let account = new Account()
    account.save(function(err) {

        account.nextCount(function(err, count) {

        })
    })
})

module.exports = mongoose.model('Account', AccountSchema)