const { User } = require('../models/user.model');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const userController = {};


//ESPERAR A QUE SE DECIDAN LOS ENDPOINTS, (HABLAR CON LOS 2 EQUIPOS(?))
//Funciones Hexcode:
function generateHexCode(){
    return crypto.randomBytes(4).toString('hex');
}
function isHexCodeUnique(hex_code)
{
    return User.findOne({
            where: {hex_code: hex_code} 
        })
        .then((user) => {
            return user ? false : true;
        })
}

//Controllers:

userController.getAllUsers = async (req,res) => {
    const response = await User.findAll()
        .then((data) => {
            const res = {error: false, data: data}
            return res;
        }).catch((error) => {
            const res = {error: true, message: error}
            return res;
        })
        res.json(response);
}

userController.createUser = async (req,res) => {
    try {
        let urlImage;
        if (req.file === undefined) {
            urlImage = null;
        }else{
            const url = req.protocol + '://' + req.get('host');
            urlImage = url + '/public/' + req.file.filename
        }
        const modelData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            image: urlImage,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            hex_code: "",
            address: req.body.address,
            phone: req.body.phone
        }
        let hex_code = generateHexCode();
        isHexCodeUnique(hex_code)
            .then(async (isUnique) => {
                if (isUnique) {
                    modelData.hex_code = hex_code;
                    const response = await User.create(modelData)
                        .then(data => {
                            const res = {error: false, data: data, message: 'Usuario creado'};
                            return res;
                        }).catch(error => {
                            const res = {error: true, message: error}
                            return res;
                        })
                    res.json(response);
                }else{
                    hex_code = generateHexCode();
                    return isHexCodeUnique(hex_code);
                }
            }).then(() => {
                console.log('Usuario creado con exito');
            }).catch(error => {
                console.log(error);
            }) 
    } catch (error) {
        console.log(error);
    }
}

module.exports = userController;