const { Transaction } = require("../models/transactions.model");
const transactionsController = {};
const { Coins } = require("../models/coins.model");
const { Wallet } = require("../models/wallet.model");

const getSymbol = (coin_id) => {
  const response = Coins.findOne({ where: { coin_id: coin_id } })
      .then((data) => {
        return data.dataValues.symbol;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    return response;
}

const getTransactions = async (data) => {
  let transactionArray = [];
  for (const Element of data) {
    let transactionModel = {
          sender_hexcode: '',
          receiver_hexcode: '',
          amount: '',
          symbol : '',
          transaction_date: ''
        }
    transactionModel.sender_hexcode = Element.dataValues.sender_hexcode;
    transactionModel.receiver_hexcode = Element.dataValues.receiver_hexcode;
    transactionModel.amount = Element.dataValues.amount;
    transactionModel.symbol = await getSymbol(Element.dataValues.coinId);
    transactionModel.transaction_date = Element.dataValues.transaction_date;
    transactionArray.push(transactionModel);
  }
  return transactionArray;
}

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
    let flag = true;

    const walletId = await Wallet.findOne({
      where: { hexacode_user: req.body.sender_hexcode },
    })
      .then((data) => {
        return data.dataValues.wallet_id;
      })
      .catch((err) => {
        return { error: true, message: "El codigo del usuario es incorrecto" };
      });
    const coinId = await Coins.findOne({
      where: { symbol: req.body.symbol, walletId: walletId },
    }).then((data) => {
      return data.dataValues.coin_id;
    });

    const modelTransaction = {
      sender_hexcode: req.body.sender_hexcode,
      receiver_hexcode: req.body.receiver_hexcode,
      amount: req.body.amount,
      coinId: coinId,
    };
    //buscamos la del emisor
    const idWalletSender = await Wallet.findOne({
      where: { hexacode_user: req.body.sender_hexcode },
    })
      .then((data) => {
        if (data) {
          return data.dataValues.wallet_id;
        } else {
          flag = false;
          res
            .status(400)
            .json({ message: "El codigo del emisor no es valido" });
        }
      })
      .catch((err) => {
        flag = false;
        res.status(400).json({ error: true, message: err });
      });

    const sender = await Coins.findOne({
      where: { walletId: idWalletSender, coin_id: coinId },
    }).then(async (data) => {
      if (!data) {
        flag = false;
        res
          .status(401)
          .json({ error: true, message: "No tienes saldo suficiente" });
      } else {
        const coinData = {
          name: data.dataValues.name,
          symbol: data.dataValues.symbol,
          image: data.dataValues.image,
          amount: req.body.amount,
          walletId: 0,
        };
        if (data.dataValues.amount < req.body.amount) {
          flag = false;
          res
            .status(401)
            .json({ error: true, message: "No tienes saldo suficiente" });
        } else {
          //BUSCO EL ID DEL RECEPTOR
          const idWalletReceiver = await Wallet.findOne({
            where: { hexacode_user: req.body.receiver_hexcode },
          })
            .then((data) => {
              if (data) {
                return data.dataValues.wallet_id;
              } else {
                flag = false;
                res
                  .status(400)
                  .json({ message: "El codigo del receptor no es valido" });
              }
            })
            .catch((err) => {
              flag = false;
              res.status(400).json({ error: true, message: err });
            });
          //CREO UNA MONEDA O SUMO EL MONTO AL RECEPTOR
          const receiver = await Coins.findOne({
            where: { walletId: idWalletReceiver, symbol: coinData.symbol },
          })
            .then(async (data) => {
              if (!data) {
                coinData.walletId = idWalletReceiver;
                const createCoin = await Coins.create(coinData).then((data) => {
                  return {
                    error: false,
                    data: data.dataValues,
                    message: "Moneda agregada a la wallet",
                  };
                });

                return createCoin;
              } else {
                //SUMO AL TOTAL (RECEPTOR)
                const totalReceiver =
                  parseFloat(data.dataValues.amount) +
                  parseFloat(req.body.amount);
                const aux = await Coins.update(
                  { amount: totalReceiver },
                  {
                    where: { coin_id: data.dataValues.coin_id },
                  }
                )
                  .then((data) => {
                    const res = {
                      error: false,
                      data: data,
                      message: "Saldo actualizado",
                    };
                    return res;
                  })
                  .catch((err) => {
                    flag = false;
                    const res = { error: true, message: err };
                    return res;
                  });

                return aux;
              }
            })
            .catch((err) => {
              flag = false;
              res.status(400).json({ error: true, message: err });
            });
          //UPDATE A LA MONEDA DEL EMISOR \/
          let aux;
          if (flag == true) {
            //compruebo que nunca haya errores
            const total = data.dataValues.amount - req.body.amount;
            aux = await Coins.update(
              { amount: total },
              {
                where: { coin_id: data.dataValues.coin_id },
              }
            )
              .then(() => {
                const res = { error: false, message: "Saldo actualizado" };
                return res;
              })
              .catch((err) => {
                flag = false;
                const res = { error: true, message: err };
                return res;
              });
          }

          return { sender: aux, receiver: receiver };
        }
      }
    });
    //CREACION DE LA TRANSACCION: TODO: crearla antes de todo esto y despues dropearla si hay un error, o crearla solo si no hay errores
    if (flag == true) {
      const response = await Transaction.create(modelTransaction)
        .then((data) => {
          const res = {
            error: false,
            data: {
              sender_hexcode: modelTransaction.sender_hexcode,
              receiver_hexcode: modelTransaction.receiver_hexcode,
              amount: modelTransaction.amount,
              symbol: req.body.symbol,
              transaction_date: modelTransaction.transaction_date,
            },
            message: "Transaccion realizada",
          };
          return res;
        })
        .catch((error) => {
          const res = { error: true, mesagge: error };
          return res;
        });
      res.json({ res: response });
    }
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
    }).then(async (data) => {
      return {data: await getTransactions(data)}
    }).catch(err => {
      console.log(err);
    })

    console.log(response);
    const aux = await Transaction.findAll({
      where: { receiver_hexcode: hexcode },
    }).then(async (data) => {
      return {data: await getTransactions(data)}
    }).catch(err => {
      console.log(err);
    })

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
