const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
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
    balance: {
      type: Sequelize.DECIMAL,
      defaultValue: 2000,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  Wallet,
};
