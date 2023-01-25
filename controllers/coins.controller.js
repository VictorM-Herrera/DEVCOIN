const { Coins } = require("../models/coins.model");
const coinsController = {};

coinsController.createCoins = async (req, res) => {
  try {
    const aux = await Coins.findOne({
      where: { symbol: req.body.symbol, walletId: req.body.walletId },
    }).then(async (data) => {
      if (data) {
        return {
          error: true,
          data: data,
          message: "Ya se cargo esta moneda a la wallet",
        };
        //TODO sumar los valores
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
            const res = { error: false, data: data, message: "Coin Create" };
            return res;
          })
          .catch((e) => {
            if (
              e.name == "SequelizeUniqueConstraintError" ||
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
    .catch((error) => {
      const res = { error: true, message: error };
      return res;
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
coinsController.UpdateCoins = async (req, res) => {
  try {
    const { symbol } = req.params;
    //verificar que el monto a vender no sea mayor al monto de la moneda
    //restar y despues actualizar
    const response = await Coins.update(req.body, {
      where: { symbol: req.body.symbol, walletId: req.body.walletId },
    })
      .then((data) => {
        const res = { error: false, data: data, message: "Coin actualizada" };
        return res;
      })
      .catch((error) => {
        const res = { error: true, message: error };
        return res;
      });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};

module.exports = coinsController;
