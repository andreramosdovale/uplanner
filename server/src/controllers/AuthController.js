const Auth = require('../auth/firebase')
const User = require('../controllers/UserController')
const moment = require('moment')

module.exports = {
    async createUser(req, res) {
        Auth.SignUpWithEmailAndPassword(req.body.email, req.body.password)
            .then((user) => {
                if(!user.err){
                    User.createUser(user.user.uid, user.user.email, new Date())
                        .then(() => {
                            return res.status(200).json('Cadastro Efetuado');
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                }else{
                    return user.err
                }
            })
            .catch((err) => {
                console.log(err)
            })
    },

    async login(req, res) {
        Auth.SignInWithEmailAndPassword(req.body.email, req.body.password)
            .then((login) => {
                if(!login.err){
                    User.createJWT(login.user.uid, login.user.email)
                        .then((token) => {
                            User.saveJWT(token, login.user.uid)
                                .then(() => {
                                    return res.status(200).json(token);
                                })
                                .catch((err) => {
                                    console.error(err)
                                })
                        })
                        .catch((err) => {
                            console.error(err)
                        })
                }else{
                    return res.json('Senha Incorreta')
                }
            })
    },
};

return module.exports