const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const logger = require('morgan');

const rotasProdutos = require('./routes/produtos');
require('./db');

const app = express();

// Libera o acesso a outros apps
app.use(cors());

// Sanitiza queries maliciosas no MongoDB
app.use(mongoSanitize());

// Habilita log mais detalhada enquanto em desenvolvimento
app.use(logger('dev'));

// Habilita o parsing de JSON no corpo das requisições
app.use(bodyParser.json());

app.use('/produtos', rotasProdutos);

const porta = 3000;
app.listen(porta, () => console.log(`App rodando na porta ${porta}`));
