require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')

const app = express()
const { PORT } = process.env

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Authorization");
    res.header("Content-Type", "application/json");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(routes)

app.listen(PORT, () => console.log(`Server rodando na porta - ${PORT}`))