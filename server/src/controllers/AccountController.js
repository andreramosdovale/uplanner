const User = require('../models/UserModel')
const Account = require('../models/AccountModel')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    async createAccount(req, res) {
        const token = req.headers.authorization
        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let [user] = await User.find({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })
            const data = new Account({ user_account_id:user._id, user_account_email:user.email })

            return res.send(data.save())
        })
    },

    async updateAccount(req, res) {
        const token = req.headers.authorization
        const { _id, nickname, status } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({_id:_id, user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Conta invalido' })
            })

            if (nickname === "" || nickname === undefined) {
                let update = await Account.updateOne({ _id: account._id}, {$set: {active:status}})

                return res.send(update)
            } else if (status === "" || status === undefined){
                let update = await Account.updateOne({ _id: account._id}, {$set: {nickname:nickname}})

                return res.send(update)
            } else {
                return res.send("conta bancaria não alterada")
            }
        })
    },

    async listAccount(req, res) {
        const token = req.headers.authorization

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.find({user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Conta invalido' })
            })

            return res.json(account)
        })
    },

    async readAccount(req, res) {
        const token = req.headers.authorization
        const { _id } = req.body

        let raw_token = token.replace('Bearer ','')

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.findOne({_id: decoded._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Usuario invalido' })
            })

            let account = await Account.findOne({_id:_id ,user_account_id:user._id}).catch((err) => {
                return res.status(500).json({ auth: false, message: 'Conta invalido' })
            })

            return res.json(account)
        })
    },

};