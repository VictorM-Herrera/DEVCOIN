const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
//const { Coins } = require("./coins.model");
//const validateRequest = require('../middlewares/validateRequest');
//const Joi = require('joi');

const Wallet = sequelize.define(
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

module.exports = {
  Wallet,
};
