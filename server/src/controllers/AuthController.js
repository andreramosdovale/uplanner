const Auth = require('../auth/firebase');

module.exports = {
    async createUser(req, res) {
        Auth.SignUpWithEmailAndPassword(req.body.email, req.body.password)
            .then((user) => {
                if(!user.err){
                    console.log('user -> ',user)
                    let userData = JSON.parse(user)
                    userData = userData.user
                    console.log('data -> ',userData);
                    return res.send(userData).statusCode('400')
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
                    return res.send('deu certo')
                } else {
                    return login.err
                }
            })
    },
};

return module.exports