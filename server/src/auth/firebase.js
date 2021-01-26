const { SECRET } = process.env
const jwt = require('jsonwebtoken')
const firebase = require("firebase/app");
const User = require('../controllers/UserController')
require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyBRTFaWOR-dvSqHCsYlxPsb1g2m8iKUemA",
    authDomain: "uplanner-ba5b5.firebaseapp.com",
    projectId: "uplanner-ba5b5",
    storageBucket: "uplanner-ba5b5.appspot.com",
    messagingSenderId: "965724452408",
    appId: "1:965724452408:web:474a86ef6543efe40818cd",
    measurementId: "G-7LH02J3E0Y"
};

const fb = firebase.initializeApp(firebaseConfig);

module.exports.SignUpWithEmailAndPassword = (email, password) => {
    return fb.auth().createUserWithEmailAndPassword(email, password)
    .then((user) => {
        return user
    })
    .catch((err) => {
        let errorCode = error.code
        let errorMesssage = error.message
        if(errorCode == 'auth/weak-password') {
            return {err: 'Senha muito fraca'}
        } else {
            return {err: errorMesssage}
        }
    })
}

module.exports.SignInWithEmailAndPassword = (email, password) => {
    return fb.auth().signInWithEmailAndPassword(email, password)
        .then((id) => {
            return id
        })
        .catch(function(err) {
            let errorCode = err.code;
            let errorMessage = err.message;
            if (errorCode === 'auth/wrong-password') {
                return {err: 'Senha Incorreta'}
            } else {
                return {err: errorMessage}
            }
        });
}

return module.exports