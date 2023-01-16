const express = require("express");
const wallet = express.Router();
const walletController = require("../controllers/wallet.controller");

wallet.get("/", walletController.getAllWallets);
wallet.get("/:hex_code", walletController.getWalletByHexacode);

module.exports = wallet;
