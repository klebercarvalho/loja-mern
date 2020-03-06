const mongoose = require('mongoose');

const esquema = new mongoose.Schema({
    descricao: {
        type: String,
        required: true
    },
    categoria: String
});

const Produto = mongoose.model('Produto', esquema);

module.exports = Produto;