const express = require('express');
const produtoCtrl = require('../controllers/produto_controller');

const router = express.Router();

router.get('/', produtoCtrl.recuperarTodos);
router.post('/', produtoCtrl.salvar);
router.delete('/:id', produtoCtrl.remover);

module.exports = router;
