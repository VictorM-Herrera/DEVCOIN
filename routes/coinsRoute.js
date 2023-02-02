const express = require("express");
const { required } = require("joi");
const coins = express.Router();
const coinsController = require("../controllers/coins.controller");
const { ValidateCoins } = require("../models/coins.model");

coins.get("/", coinsController.getAllCoins);
coins.post("/", [ValidateCoins], coinsController.createCoins);
// coins.get("/:coin_id", coinsController.getSymbolByCoinId);
coins.put("/", coinsController.sellCoins);

module.exports = coins;
