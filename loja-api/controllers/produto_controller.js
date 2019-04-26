const Produto = require('../models/produto');

const controller = {
    salvar: (req, res) => {
        const produto = req.body;

        Produto
            .create(produto)
            .then(
                produtoSalvo => res.status(201).json(produtoSalvo)
            );
    },
    remover: (req, res) => {
        const id = req.params.id;

        Produto
            .findByIdAndRemove(id)
            .exec()
            .then(
                () => res.status(204).end()
            );
    },
    recuperarTodos: (req, res) => {
        Produto
            .find()
            .exec()
            .then(
                produtos => res.json(produtos)
            );
    }
};

module.exports = controller;
