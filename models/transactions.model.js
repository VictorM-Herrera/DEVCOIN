const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
const Joi = require('joi');

const Transaction = sequelize.define("Transactions", {

  transaction_id: {         // ID DE TRANSACCION
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  }, 

  transaction_date: {       // FECHA DE TRANSACCION 
    type: Sequelize.DATE,
    defaultValue: Sequelize.fn('NOW'),
  }, 

  sender_hexcode: {         // CODIGO DEL EMISOR 
    type: Sequelize.STRING,
  },

  receiver_hexcode: {       // CODIGO DEL RECEPTOR
    type: Sequelize.STRING,
  },

  amount: {                 // CANTIDAD - TIPO DE VARIABLE : DECIMAL
    type: Sequelize.DECIMAL,
  },

  type_coin: {              // TIPO DE CRYTOMONEDA
    type: Sequelize.STRING,
  },
},{timestamps:false});

const ValidateTransaction = (req,res,next) => {
    const schema = Joi.object({
        sender_hexcode: Joi.string().required()
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
