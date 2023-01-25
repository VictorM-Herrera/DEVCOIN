const { response } = require("express");
const { Coins } = require("../models/coins.model");
const coinsController = {};

coinsController.createCoins = async (req, res) => {
  try {
    const aux = await Coins.findOne({
      where: { symbol: req.body.symbol, walletId: req.body.walletId },
    }).then(async (data) => {
      if (data) {
        const addAmount = parseFloat(data.dataValues.amount) + parseFloat(req.body.amount);
        const add = await Coins.update(
          { amount: addAmount },
          { where: { coin_id: data.dataValues.coin_id } }
        )
          .then((data) => {
            const res = { data: data, message: "Saldo actualizado" };
            return res;
          })
          .catch((err) => {
            res.status(400).json({ error: true, message: err });
          });
        return add;
      } else {
        const modelCoin = {
          name: req.body.name,
          symbol: req.body.symbol,
          image: req.body.image,
          amount: req.body.amount,
          walletId: req.body.walletId,
        };
        const response = await Coins.create(modelCoin)
          .then((data) => {
            const res = {error: false, data: data, message: "Coin creada"};
            return res;
          })
          .catch((e) => {
            if (
              e.name == "SequelizeUniqueConstraintError"||
              e.name == "SequelizeValidationError"
            ) {
              return {
                error: true,
                message: e.errors.map((err) => err.message),
              };
            } else {
              return { error: true, message: e };
            }
          });
        return response;
      }
    });
    res.json(aux);
  } catch (e) {
    console.log(e);
  }
};

coinsController.getAllCoins = async (req, res) => {
  const response = await Coins.findAll()
    .then((data) => {
      const res = { error: false, data: data };
      return res;
    })
    .catch((err) => {
      res.status(400).json({ error: true, message: err });
    });
  res.json(response);
};

//no sirve mas:
coinsController.getByCoinSymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const response = await Coins.findOne({ where: { symbol: symbol } })
      .then((data) => {
        const res = { error: false, data: data };
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

//vender monedas:

  coinsController.sellCoins = async (req, res) => {
    
    try {
      const modelCoin = {
        symbol: req.body.symbol,
        amount: req.body.amount,
        walletId: req.body.walletId,
      };
      //verificar que el monto a vender no sea mayor al monto de la moneda
      const validate = await Coins.findOne({
        where: { symbol: modelCoin.symbol, walletId: modelCoin.walletId },
      }).then(async (data) => {
        if (!data) {
          res
            .status(401)
            .json({ error: true, message: "No tienes saldo suficiente" });
        } else {
          if (data.dataValues.amount < modelCoin.amount) {
            res
              .status(401)
              .json({ error: true, message: "No tienes saldo suficiente" });
          } else {
            //restar y despues actualizar
            const totalCoin =
              parseFloat(data.dataValues.amount) - parseFloat(modelCoin.amount);
            const response = await Coins.update(
              { amount: totalCoin },
              {
                where: { symbol: req.body.symbol, walletId: req.body.walletId },
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
                res.status(400).json({ error: true, message: err });
              });
              console.log(response)
            return response;
          }
        }
      });
      res.json({validate: validate});
    } catch (err) {
      console.log(err);
    }
  };

module.exports = coinsController;
