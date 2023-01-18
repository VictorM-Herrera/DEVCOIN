const { Wallet } = require("../models/wallet.model");
const walletController = {};
const { Coins } = require("../models/coins.model");

walletController.getAllWallets = async (req, res) => {
  const response = await Wallet.findAll()
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

walletController.getWalletByHexacode = async (req, res) => {
  try {
    const { hex_code } = req.params;
    const response = await Wallet.findOne({
      where: { hexacode_user: hex_code },
    })
      .then(async (data) => {
        const detail = await Coins.findAll({
          where: { walletId: data.dataValues.wallet_id },
        })
          .then((data) => {
            const res = { error: false, data: data };
            return res;
          })
          .catch((error) => {
            const res = { error: true, message: error };
            return res;
          });

        const res = { error: false, wallet: data, coins: detail };
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
  // try {
  //   const { hex_code } = req.params;
  //   const wallet = await Wallet.findOne({ where: { hexacode_user: hex_code } });
  //   if (!wallet) {
  //     res.status(404).send({ error: true, message: "wallet not found" });
  //   }
  //   const { wallet_id } = req.params;
  //   const coins = await Coins.findAll({ where: { wallet_id: wallet_id } });
  //   res.json({ error: false, data: { wallet, coins } });
  // } catch (e) {
  //   console.log(e);
  //   res.status(500).send({ error: true, message: e });
  // }
};

module.exports = walletController;
