const express = require("express");
const router = express.Router();
const transactionsController = require('../controllers/transaction.controllers')
const {ValidateTransaction} = require('../models/transactions.model')

router.get('/transactions', transactionsController.getAllTransactions) //OBTIENE TODAS LAS TRANSACCIONES

router.get('/transactions', transactionsController.getAllByUserCode) // OBTIENE TRANSACCION MEDIANTE EL EMISOR Y EL RECEPTOR

router.post('/transactions',[ValidateTransaction], transactionsController.createTransaction) // CREA UNA TRANSACCION

router.delete('/transactions/:id', transactionsController.deleteTransaction) //ELIMINA LA TRANSACCION MEDIANTE EL ID


module.exports = router