const { Transaction } = require('../models/transactions.model');
const transactionsController = {};


//OBTIENE TODAS LAS TRANSACCIONES

transactionsController.getAllTransactions = async (req, res) => {   
    
    const response = await Transaction.findAll()
        .then((data) => {
            const res = { error: false, data: data }
            return res;
        }).catch((error) => {
            const res = {error: true, message: error}
            return res;
        })
        res.json(response);
}

// CREA UNA TRANSACCION

transactionsController.createTransaction = async (req, res) => {
    try {
        const modelTransaction = {
            date: req.body.transaction_date,
            sender_hexcode: req.body.sender_hexcode,
            receiver_hexcode: req.body.receiver_hexcode,
            amount: req.body.amount,
            type_coin: req.body.type_coin
        }
        const response = await Transaction.create(modelTransaction)
            .then((data) => {
                const res = {error: false, data: data, message: 'Transaccion realizada'}
                return res;
            }).catch(error =>{
                const res = {error: true, mesagge: error}
                return res
            })
            res.json(response);
    }catch(err){
        console.log(err);
    }
}

// OBTIENE TRANSACCION MEDIANTE EL EMISOR Y EL RECEPTOR

transactionsController.getAllByUserCode = async (req, res) =>{
    try{
        const { sender_hexcode, receiver_hexcode  } = req.params;
        const response = await Transaction.findAll({
            where: { sender_hexcode: sender_hexcode,
                    receiver_hexcode: receiver_hexcode}
        }).then((data) => {
            const res = { error: false, data: data }
            return res;
        }).catch(error => {
            const res = { error: true, message: error }
            return res;
        });
        res.json(response);
    }catch(err) {
        console.log(err);
    }
}

//ELIMINA LA TRANSACCION MEDIANTE EL ID

transactionsController.deleteTransaction = async (req, res) => {
    try{
        const { id } = req.params;

        const response = await Transaction.destroy({
            where: { transaction_id: id  }
        }).then((data) => {
            const res = { error: false, data: data, message: 'Eliminado'}
            return res;
        }).catch(error => {
            const res = { error: true, message: error }
            return res;
        });
        res.json(response);
    }catch(e){
        console.log(e);
    }
}

module.exports = transactionsController

