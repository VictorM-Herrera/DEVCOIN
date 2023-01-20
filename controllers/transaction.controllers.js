const { Transaction } = require("../models/transactions.model");
const transactionsController = {};
const { Coins } = require('../models/coins.model');
const { Wallet } = require('../models/wallet.model');

//OBTIENE TODAS LAS TRANSACCIONES

transactionsController.getAllTransactions = async (req, res) => {
  const response = await Transaction.findAll()
    .then((data) => {
      const res = { error: false, data: data };
      return res;
    })
    .catch((error) => {
      const res = { error: true, message: error };
      return res;
    });
  res.json(response);
};

// CREA UNA TRANSACCION

transactionsController.createTransaction = async (req, res) => {
  try {
    const modelTransaction = {
      sender_hexcode: req.body.sender_hexcode,
      receiver_hexcode: req.body.receiver_hexcode,
      amount: req.body.amount,
      coinId: req.body.coinId,
    };
    //buscamos la del emisor
    const idWalletSender = await Wallet.findOne({
      where:{hexacode_user: req.body.sender_hexcode}
    })
    .then((data) => {
      if (data) {
        return data.dataValues.wallet_id;
      }else{
        res.status(400).json({message: 'El codigo del emisor no es valido'});
      }
    }).catch(err => {
      res.status(400).json({error: true, message: err})
    })

    const sender = await Coins.findOne({
      where:{walletId: idWalletSender, coin_id: req.body.coinId}
    }).then( async (data) => {
      if (!data) {
        res.status(401).json({error:true, message: 'No tienes saldo suficiente'})
      }else{
        const coinData = {
          name: data.dataValues.name,
          symbol: data.dataValues.symbol,
          image: data.dataValues.image,
          amount: req.body.amount,
          walletId: 0,
        }
        if (data.dataValues.amount < req.body.amount) {
          res.status(401).json({error:true, message: 'No tienes saldo suficiente'})
        }else{
          //update a la moneda
          const total = (data.dataValues.amount - req.body.amount);
          const aux = await Coins.update({amount : total},{
            where:{coin_id: data.dataValues.coin_id}
          }).then((data) => {
            const res = { error: false, message: "Saldo actualizado" };
            return res;
          })
          .catch((err) => {
            const res = { error: true, message: err };
            return res;
          });

          //busco la id del receptor
          const idWalletReceiver = await Wallet.findOne({
            where:{hexacode_user: req.body.receiver_hexcode}
          }).then((data) => {
            if (data) {
              return data.dataValues.wallet_id;
            }else{
              res.status(400).json({message: 'El codigo del receptor no es valido'});
            }
          }).catch(err => {
            res.status(400).json({error: true,message: err })
          })
          
          const receiver = await Coins.findOne({
            where:{walletId: idWalletReceiver, symbol: coinData.symbol}
          }).then( async (data) => {
            console.log(data);
            if (!data) {
              coinData.walletId = idWalletReceiver;
              const createCoin = await Coins.create(coinData)
                .then((data) => {
                  return {error: false, data:data, message:'Moneda agregada a la wallet'}
                })

                return createCoin;
            }else{
              console.log(data);
              //update a la moneda
              const totalReceiver = (parseFloat(data.dataValues.amount) + parseFloat(req.body.amount));
              const aux = await Coins.update({amount : totalReceiver},{
                where:{coin_id: data.dataValues.coin_id}
              }).then((data) => {
                const res = { error: false, data: data, message: "Saldo actualizado" };
                return res;
              })
              .catch((err) => {
                const res = { error: true, message: err };
                return res;
              });

              return aux;
            }
          }).catch(err => {
            res.status(400).json({error:true, message: err})
          })//agregar catch(?)
          
          return {sender: aux, receiver: receiver};
        }
      }
    })
    //CREACION DE LA TRANSACCION: TODO: crearla antes de todo esto y despues dropearla si hay un error, o crearla solo si no hay errores
    const response = await Transaction.create(modelTransaction)
      .then((data) => {
        const res = {
          error: false,
          data: data,
          message: "Transaccion realizada",
        };
        return res;
      })
      .catch((error) => {
        const res = { error: true, mesagge: error };
        return res;
      });
    res.json({res: response, other: sender});
  } catch (err) {
    console.log(err);
  }
};

// OBTIENE TRANSACCION MEDIANTE EL EMISOR Y EL RECEPTOR

transactionsController.getAllByUserCode = async (req, res) => {
  try {
    const { hexcode } = req.params;
    const response = await Transaction.findAll({
      where: { sender_hexcode: hexcode },
    })
      .then((data) => {
        const res = { error: false, data: data };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    const aux = await Transaction.findAll({
      where: { receiver_hexcode: hexcode },
    })
      .then((data) => {
        const res = { error: false, data: data };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    res.json({ emisor: response, receptor: aux });
  } catch (err) {
    console.log(err);
  }
};

//ELIMINA LA TRANSACCION MEDIANTE EL ID

transactionsController.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await Transaction.destroy({
      where: { transaction_id: id },
    })
      .then((data) => {
        const res = { error: false, data: data, message: "Eliminado" };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    res.json(response);
  } catch (e) {
    console.log(e);
  }
};

module.exports = transactionsController;
