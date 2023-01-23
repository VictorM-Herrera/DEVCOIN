const express = require("express");
const wallet = express.Router();
const walletController = require("../controllers/wallet.controller");
const validateToken = require('../middlewares/validateToken');


wallet.get("/", walletController.getAllWallets);
wallet.get("/:hex_code",[validateToken], walletController.getWalletByHexacode); //pide token

module.exports = wallet;
