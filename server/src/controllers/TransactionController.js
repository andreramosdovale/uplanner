const User = require('../models/UserModel')
const Account = require('../models/AccountModel')
const Transaction = require('../models/TransactionModel')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    async createTransaction(req, res) {
        const token = req.headers.authorization
        const { account_id, type, value } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({_id: account_id, user_account_id: user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Conta invalido' })
            })

            const data = new Transaction({ account_transaction_id: account._id, type: type, value:value})

            return res.send(data.save())
        })
    },

    async updateTransaction(req, res) {
        const token = req.headers.authorization
        const { _id, status } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação invalidoa' })
            })

            let transaction = await Transaction.findOne({_id: _id, account_transaction_id: account._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação não atualizada' })
            })

            if (status === "Paga" && transaction.type === "Entrada") {
                let updateAccount = await Account.updateOne({user_account_id:user._id}, {$inc: {value:value}})
                let updateTransaction = await Account.updateOne({_id: _id, account_transaction_id: account._id}, {$set: {status:status}})

                return res.send(updateAccount, updateTransaction)
            } else if (status === "Paga" && transaction.type === "Saida"){
                let updateAccount = await Account.updateOne({user_account_id:user._id}, {$inc: {value:-value}})
                let updateTransaction = await Account.updateOne({_id: _id, account_transaction_id: account._id}, {$set: {status:status}})

                return res.send(updateAccount, updateTransaction)
            }else if (status === "Cancelada"){
                let updateTransaction = await Account.updateOne({_id: _id, account_transaction_id: account._id}, {$set: {status:status}})

                return res.send(updateTransaction)
            } else {
                return res.send("Transasão não alterada")
            }
        })
    },

    async deleteTransaction(req, res) {
        const token = req.headers.authorization
        const { _id } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação invalidoa' })
            })

            let remove = await Transaction.remove({_id: _id, account_transaction_id: account._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação não removida' })
            })

            return res.send(remove)
        })
    },

    async listTransaction(req, res) {
        const token = req.headers.authorization
        const { _id } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação invalidoa' })
            })

            let list = await Transaction.find({_id: _id, account_transaction_id: account._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação não atualizada' })
            })

            return res.send(list)
        })
    },

    async readTransaction(req, res) {
        const token = req.headers.authorization
        const { _id } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let transaction = await Transaction.findOne({_id:_id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Transação invalida' })
            })

            return res.json(transaction)
        })
    },
};