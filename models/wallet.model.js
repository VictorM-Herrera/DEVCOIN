const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
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
    hexacode_user:{
      type: Sequelize.STRING,
      references:{
          model: 'users',
          key: 'hex_code',
      }
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Wallet,
};
