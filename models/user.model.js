//const Joi = require('joi');
const Sequelize = require("sequelize");
const sequelize = require("../config/mysql.config");
//const { Wallet } = require("./wallet.model");
//const validateRequest = require('../middlewares/validateRequest');

const User = sequelize.define(
  "users",
  {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: Sequelize.STRING,
    last_name: Sequelize.STRING,
    img: {
      type: Sequelize.TEXT,
      defaultValue: null,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "Debe ser un email valido",
        },
      },
    },
    password: Sequelize.STRING,
    hex_code: Sequelize.STRING,
    phone: {
      type: Sequelize.STRING,
      unique: true,
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  },
  { timestamps: false }
);

/**
 * 
 * const ValidateUser = (req,res,next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(5).max(100).required()
        .messages({
            'string.empty': "Ingresa el Nombre",
            'string.min': "El nombre debe ser mayor a 5 caracteres",
            'any.required': "Ingresa el Nombre"
        }),
        last_name: Joi.string().min(5).max(100).required()
        .messages({
            'string.empty': "Ingresa el Apellido",
            'string.min': "El Apellido debe ser mayor a 5 caracteres",
            'any.required': "Ingresa el Apellido"
        }),
        email:Joi.string().email().required()
        .messages({
            'email.empty': "Ingresa el email",
            'any.required': "Ingresa el email"
        }),
        password: Joi.string().min(5).max(100).required()
        .messages({
            'password.empty': "Ingresa el password",
             'password.min': "El password debe ser mayor a 5 caracteres",
            'any.required': "Ingresa el password"
        }),

    });
    validateRequest(req,res,next,schema);
}
 */

module.exports = {
  User,
};
