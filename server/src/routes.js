const express = require('express');
const routes = express.Router();

const AuthController = require('./controllers/AuthController.js')

routes.post('/auth/createUser', AuthController.createUser)

module.exports = routes;