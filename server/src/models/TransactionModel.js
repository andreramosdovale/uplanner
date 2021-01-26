const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose.connection)


const TransactionsSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    account_transaction_id: {type:String, unique:false},
    type: {type:String, unique:false},
    status: {type:String, default:"Pendente", unique:false},
    date: { type: Date, default: Date.now, unique:false},
    value: { type:Number, unique:false, required:true }
},{ collection: 'transactions' })

TransactionsSchema.plugin(autoIncrement.plugin, {
    model: 'transactions',
    field: '_id',
    startAt: 1,
    incrementBy: 1
})

let Transactions = mongoose.model('transactions', TransactionsSchema)

Transactions.nextCount(function(err, count) {

    let transactions = new Transactions()
    transactions.save(function(err) {

        transactions.nextCount(function(err, count) { })

    })
})

module.exports = mongoose.model('transactions', TransactionsSchema)