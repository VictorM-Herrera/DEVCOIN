const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const Joi = require('joi');

const Transaction = sequelize.define("Transactions", {

  transaction_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  transaction_date: {
    type: Sequelize.DATE,
    defaultValue: DataTypes.NOW,
  },

  transmitter_hexcode: {
    type: Sequelize.STRING,
  },

  receiver_hexcode: {
    type: Sequelize.STRING,
  },

  amount: {
    type: Sequelize.DECIMAL,
  },

  type_coin: {
    type: Sequelize.STRING,
  },
},{timestamps:false});

const ValidateTransaction = (req,res,next) => {
    const schema = Joi.object({
        transmitter_hexcode: Joi.string().required()
        .messages({
            'string.empty': "Ingresa al Emisor",
            'any.required': "Ingresa al Emisor"
        }),
        receiver_hexcode: Joi.string().required()
        .messages({
            'string.empty': "Ingresa al Receptor",
            'any.required': "Ingresa al Receptor"
        }),
        amount: Joi.number().required()
        .messages({
            'number.empty': "Ingrese el monto a transferir",
            'any.required': "Ingrese el monto a transferir"
        }),
        type_coin: Joi.string().required()
        .messages({
            'string.empty': "Ingresa la cryptomoneda",
            'any.required': "Ingresa al cryptomoneda"
        }),
    });
    validateRequest(req,res,next,schema);
}

module.exports = {
    Transaction,
    ValidateTransaction
}
