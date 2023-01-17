const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");

//const validateRequest = require('../middlewares/validateRequest');
//const Joi = require('joi');

const Coins = sequelize.define(
  "Coins",
  {
    coin_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      unique: true,
    },
    symbol: {
      type: Sequelize.STRING,
      unique: true,
    },
    image: {
      type: Sequelize.TEXT,
    },
    amount: {
      type: Sequelize.DECIMAL,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Coins,
};
