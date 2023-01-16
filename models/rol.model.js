const Joi = require('joi');
const Sequelize = require('sequelize');
const sequelize = require('../config/mysql.config');
const validateRequest = require('../middlewares/validateRequest');


const Rol = sequelize.define('roles', {
    rol_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
    },
    rol_name:{
        type: Sequelize.STRING,
        unique:true,
    },
    status:{
        type: Sequelize.BOOLEAN,
        defaultValue: true,
    },
}, {timestamps: false})

const ValidateRol = (req,res,next) => {
    const schema = Joi.object({
        rol_name: Joi.string().min(2).max(100).required()
        .messages({
            'string.empty': "Ingresa el Nombre  del rol",
            'string.min': "El nombre del rol debe ser mayor a 5 caracteres",
            'any.required': "Ingresa el Nombre  del rol"
        })
    });
    validateRequest(req,res,next,schema);
}

module.exports = {
    Rol, 
    ValidateRol,
}