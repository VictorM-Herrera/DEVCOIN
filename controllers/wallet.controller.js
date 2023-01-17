const { Wallet } = require("../models/wallet.model");
const walletController = {};

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
    const response = await Wallet.findOne({ where: { hex_code: hex_code } })
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

module.exports = walletController;
