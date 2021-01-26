const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController')
const UserController = require('./controllers/UserController')
const AccountController = require('./controllers/AccountController')
const TransactionController = require('./controllers/TransactionController')

routes.post('/auth/createUser', AuthController.createUser)
routes.post('/auth/login', AuthController.login)

routes.post('/users/logout', UserController.removeJWT)
routes.get('/users/getUser', UserController.getUser)

routes.post('/account/createAccount', AccountController.createAccount)
routes.post('/account/updateAccount', AccountController.updateAccount)
routes.post('/account/readAccount', AccountController.readAccount)
routes.post('/account/listAccount', AccountController.listAccount)

routes.post('/transaction/createTransaction', TransactionController.createTransaction)
routes.post('/transaction/updateTransaction', TransactionController.updateTransaction)
routes.post('/transaction/deleteTransaction', TransactionController.deleteTransaction)
routes.post('/transaction/readTransaction', TransactionController.readTransaction)
routes.post('/transaction/listTransaction', TransactionController.listTransaction)

module.exports = routes;