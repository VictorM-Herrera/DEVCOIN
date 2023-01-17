const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");

const validateRequest = require("../middlewares/validateRequest");
const Joi = require("joi");

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

const ValidateCoins = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
      "string.empty": "Ingresa el Nombre",
      "string.min": "El nombre debe ser mayor a 2 caracteres",
      "any.required": "Ingresa el Nombre",
    }),
    symbol: Joi.string().min(2).max(10).required().messages({
      "string.empty": "Ingresa el Symbol",
      "string.min": "El Symbol debe ser mayor a 2 caracteres",
      "any.required": "Ingresa el Symbol",
    }),
    image: Joi.string().required().messages({
      "any.required": "Ingresa una imagen",
    }),
    amount: Joi.number().required().messages({
      "any.required": "Ingresa un importe valido",
    }),
  });
  validateRequest(req, res, next, schema);
};

module.exports = {
  Coins,
  ValidateCoins,
};
