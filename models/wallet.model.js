const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
// import {Coins} from "./coins.model.js"
//const validateRequest = require('../middlewares/validateRequest');
//const Joi = require('joi');

export const Wallet = sequelize.define(
  "Wallet",
  {
    wallet_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    timestamps: false,
  }
);

Wallet.hasMany(Coins, {
  foreignKey: "amaountId",
  sourceKey: "wallet_id",
});

Coins.belongsTo(Wallet, {
  foreignKey: "amaountId",
  targetKey: "wallet_id",
});

// await Wallet.sync()
// await Coins.sync()
