const User = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const { SECRET } = process.env

module.exports = {
    async createUser(uid, email, register_date) {
        const data = new User({ _id:uid, email:email, register_date:register_date })
        return data.save()
    },

    async createJWT(_id, email) {
        return jwt.sign({
            _id: _id,
            email: email,
        }, SECRET, { expiresIn: '2h' })
    },

    async saveJWT(token, _id) {
        return User.updateOne({ _id: _id}, {$set: {token:'Bearer '+token}})
    },

    async removeJWT(req, res) {
        const token = req.headers.authorization
        let remove = await User.updateOne({token: token}, {$unset: {token: 1}})
        return res.send(remove)
    },

    async getUser (req, res) {
        const token = req.headers.authorization
        let raw_token = token.replace('Bearer ','');

        jwt.verify(raw_token, SECRET, async function(err, decoded) {
            if (err) return res.status(500).json({ auth: false, message: 'Token invalido' })

            let user = await User.find({_id: decoded._id})
            return res.send(user)
        });
    },
};