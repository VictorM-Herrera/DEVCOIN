const express = require("express");
const router = express.Router();
const walletController = require("../controllers/wallet.controller");

router.get("/", walletController.getWallet);
router.get("/:hex_code", walletController.getWalletByHexacode);

module.exports = router;
