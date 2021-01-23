const mongoose = require('mongoose');

mongoose.set('debug', true);

const Server = '127.0.0.1:27017';
const Database = 'uplanner';

mongoose.connect(`mongodb://${Server}/${Database}`, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() =>console.log(`Sucesso ao conectar com a Database ${Database} - MONGO`))
    .catch(err => {
        console.log('Falha ao conectar com a database MONGO.');
        console.log(`error: ${err}`);
    });

mongoose.Promise = global.Promise;
module.exports = mongoose;
