const express = require("express");
const coins = express.Router();
const coinsController = require("../controllers/coins.controller");

coins.get("/", coinsController.getAllCoins);
coins.post("/", coinsController.createCoins);
coins.get("/:name", coinsController.getByCoinName);
coins.put("/:name", coinsController.UpdateCoins);

module.exports = coins;
