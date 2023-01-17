const express = require("express");
const router = express.Router();
const transactionsController = require('../controllers/transaction.controllers')
const {ValidateTransaction} = require('../models/transactions.model')

router.get('/', transactionsController.getAllTransactions) //OBTIENE TODAS LAS TRANSACCIONES

router.get('/:sender/:receiver', transactionsController.getAllByUserCode) // OBTIENE TRANSACCION MEDIANTE EL EMISOR Y EL RECEPTOR

router.post('/',[ValidateTransaction], transactionsController.createTransaction) // CREA UNA TRANSACCION

router.delete('/:id', transactionsController.deleteTransaction) //ELIMINA LA TRANSACCION MEDIANTE EL ID


module.exports = router