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
    amount: {
      type: Sequelize.DECIMAL,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Coins,
};
