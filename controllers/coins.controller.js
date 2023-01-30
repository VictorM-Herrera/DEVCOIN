const { response } = require("express");
const { where } = require("sequelize");
const { Coins } = require("../models/coins.model");
const { Wallet } = require("../models/wallet.model");
const coinsController = {};

const findWalletId = async (req, res) => {
  const walletId = Wallet.findOne({
    where: { hexacode_user: req.body.hexacode },
  }).then((data) => {
    return data.dataValues.wallet_id;
  });
  return walletId;
};

const findWalletBalance = async (req, res) => {
  const walletBalance = Wallet.findOne({
    where: { hexacode_user: req.body.hexacode },
  }).then((data) => {
    return data.dataValues.balance;
  });
  return walletBalance;
};

const updateWalletBalance = async (req, res, total) => {
  const updateWallet = Wallet.update(
    { balance: total },
    {
      where: { hexacode_user: req.body.hexacode },
    }
  );
  return updateWallet;
};

coinsController.createCoins = async (req, res) => {
  try {
    let flag = true;
    const walletId = await findWalletId(req, res);
    const aux = await Coins.findOne({
      where: { symbol: req.body.symbol, walletId: walletId },
    }).then(async (data) => {
      if (data) {
        //SI LA MONEDA EXISTE
        const walletBalance = await findWalletBalance(req, res);
        if (walletBalance < req.body.total) {
          flag = false;
          res.status(409).json({ message: "Saldo insuficiente" });
        } else {
          let total = parseFloat(walletBalance) - parseFloat(req.body.total);
          console.log(
            "(YA EXISTE) Se resta " +
              req.body.total +
              " a " +
              walletBalance +
              " y da como resultado: " +
              total
          );
          updateWalletBalance(req, res, total);
        }
        if (flag !== false) {
          const addAmount =
            parseFloat(data.dataValues.amount) + parseFloat(req.body.amount);
          const add = await Coins.update(
            { amount: addAmount },
            {
              where: { coin_id: data.dataValues.coin_id },
            }
          )
            .then((data) => {
              const res = { data: data, message: "Saldo actualizado" };
              return res;
            })
            .catch((err) => {
              flag = false;
              res.status(400).json({ error: true, message: err });
            });
          return add;
        }
      } else {
        //SI LA MONEDA NO EXISTE:
        const modelCoin = {
          name: req.body.name,
          symbol: req.body.symbol,
          image: req.body.image,
          amount: req.body.amount,
          walletId: walletId,
        };
        //ACA VA LA VERIFICACION DEL SALDO (WALLET):
        const walletBalance = await findWalletBalance(req, res);
        if (walletBalance < req.body.total) {
          flag = false;
          res.status(409).json({ message: "Saldo insuficiente" });
        } else {
          let total = parseFloat(walletBalance) - parseFloat(req.body.total);
          console.log(
            "(SE CREA LA COIN) Se resta " +
              req.body.total +
              " a " +
              walletBalance +
              " y da como resultado: " +
              total
          );
          updateWalletBalance(req, res, total);
        }
        if (flag !== false) {
          const response = await Coins.create(modelCoin)
            .then(async (data) => {
              return {
                error: false,
                data: data,
                message: "Coin creada",
              };
            })
            .catch((e) => {
              flag = false;
              if (
                e.name == "SequelizeUniqueConstraintError" ||
                e.name == "SequelizeValidationError"
              ) {
                res.status(409).json({
                  error: true,
                  message: e.errors.map((err) => err.message),
                });
              } else {
                res.status(409).json({ error: true, message: e });
              }
            });
          return response;
        }
      }
    });
    //final de la funcion
    if (flag === false) {
    } else {
      res.json(aux);
    }
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
    let flag = true;
    const walletId = await findWalletId(req, res);
    const modelCoin = {
      symbol: req.body.symbol,
      amount: req.body.amount,
      walletId: walletId,
    };

    //verificar que el monto a vender no sea mayor al monto de la moneda
    const validate = await Coins.findOne({
      where: { symbol: modelCoin.symbol, walletId: modelCoin.walletId },
    }).then(async (data) => {
      if (!data) {
        res
          .status(401)
          .json({ error: true, message: "No tienes saldo suficiente" });
        flag = false;
      } else {
        if (data.dataValues.amount < modelCoin.amount) {
          res
            .status(401)
            .json({ error: true, message: "No tienes saldo suficiente" });
          flag = false;
        } else {
          //restar y despues actualizar
          const totalCoin =
            parseFloat(data.dataValues.amount) - parseFloat(modelCoin.amount);
          const response = await Coins.update(
            { amount: totalCoin },
            {
              where: { symbol: modelCoin.symbol, walletId: walletId },
            }
          )
            .then(async (data) => {
              const walletBalance = await findWalletBalance(req, res);
              let total =
                parseFloat(walletBalance) + parseFloat(req.body.total);
              updateWalletBalance(req, res, total);
              const resp = {
                error: false,
                data: data,
                message: "Saldo y balance actualizado",
              };
              return resp;
            })
            .catch((err) => {
              console.log(err);
              flag = false;
              res.status(401).json({ error: true, message: err });
            });

          return response;
        }
      }
    });

    if (flag === false) {
    } else {
      res.json({ validate: validate });
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = coinsController;
