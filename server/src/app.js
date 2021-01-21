require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors)
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('test')
});

const { PORT } = process.env

app.listen(PORT, () => console.log(`Server rodando na porta - ${PORT}`))