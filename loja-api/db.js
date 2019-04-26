const mongoose = require('mongoose');
require('./models/produto');

const dbURI = 'mongodb://localhost/loja';

mongoose.Promise = global.Promise;
mongoose.connect(dbURI, { useNewUrlParser: true });

mongoose.connection.on('connected', () => console.log('Mongoose! Conectado em ' + dbURI));

mongoose.connection.on('disconnected', () => console.log('Mongoose! Desconectado de ' + dbURI));

mongoose.connection.on('error', (erro) => console.log('Mongoose! Erro na conexão: ' + erro));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose! Desconectado pelo término da aplicação');
        process.exit(0);
    });
});

mongoose.set('debug', true);