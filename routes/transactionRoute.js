const express = require("express");
const router = express.Router();
const transactionsController = require('../controllers/transaction.controllers')
const {ValidateTransaction} = require('../models/transactions.model')

router.get('/', transactionsController.getAllTransactions)
router.get('/:id', transactionsController.getByIdTransaction) // to do 
router.post('/',[ValidateTransaction], transactionsController.createTransaction)
router.delete('/:id', transactionsController.deleteTransaction)


module.exports = router