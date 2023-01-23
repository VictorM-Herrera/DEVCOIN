const express = require("express");
const router = express.Router();
const transactionsController = require('../controllers/transaction.controllers')
const {ValidateTransaction} = require('../models/transactions.model');
const validateToken = require('../middlewares/validateToken');

//pide token TODOS

router.get('/', transactionsController.getAllTransactions) //OBTIENE TODAS LAS TRANSACCIONES

router.get('/:hexcode',[validateToken], transactionsController.getAllByUserCode) // OBTIENE TRANSACCION MEDIANTE EL EMISOR Y EL RECEPTOR

router.post('/',[ValidateTransaction, validateToken], transactionsController.createTransaction) // CREA UNA TRANSACCION

router.delete('/:id',[validateToken], transactionsController.deleteTransaction) //ELIMINA LA TRANSACCION MEDIANTE EL ID


module.exports = router