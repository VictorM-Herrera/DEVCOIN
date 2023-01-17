const { Coins } = require("../models/coins.model");
const coinsController = {};

coinsController.createCoins = async (req, res) => {
  try {
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
          return { error: true, message: e.errors.map((err) => err.message) };
        } else {
          return { error: true, message: e };
        }
      });
    res.json(response);
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

coinsController.getByCoinName = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await Coins.findOne({ where: { name: name } })
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

coinsController.UpdateCoins = async (req, res) => {
  try {
    const { name } = req.params;
    const response = await Coins.update(req.body, {
      where: { name: name },
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
