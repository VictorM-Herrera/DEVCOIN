const { User } = require('../models/user.model');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');
const userController = {};


//ESPERAR A QUE SE DECIDAN LOS ENDPOINTS, (HABLAR CON LOS 2 EQUIPOS(?))
//Funciones Hexcode:
function generateHexCode(){
    return crypto.randomBytes(5).toString('hex');
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

userController.getUserByHexCode = async (req, res) => {
    try {
        const { hexCode } = req.params;
        const response = await User.findAll({
            where: {hex_code: hexCode}
        })
        .then((data) => {
            const res = { error: false, data: data}
            return res;
        }).catch((error) => {
            const res = {error: true, message:error}
            return res;
        })
        res.json(response);
    } catch (error) {
        console.log(err);
    }
}
//mandar email
userController.createUser = async (req,res) => {
    // try {
    //     let urlImage;
    //     if (req.file === undefined) {
    //         urlImage = null;
    //     }else{
    //         const url = req.protocol + '://' + req.get('host');
    //         urlImage = url + '/public/' + req.file.filename
    //     }
    try{
        const modelData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            image: req.body.image,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            hex_code: "",
            address: req.body.address,
            phone: req.body.phone,
            rol_id: req.body.rol_id,
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

userController.deleteUserByHexCode = async (req, res) => {
    try {
        const { hexCode } = req.params;
        const response = await User.update({status: false}, {
            where:{ hex_code: hexCode }
        }).then((data) => {
            const res = { error: false, data:data, message: 'Usuario dado de baja'};
            return res;
        }).catch( err => {
            const res = { error: true, message: err};
            return res; 
        })
        res.json(response)
    } catch (error) {
        console.log(error);
    }
}

userController.updateUserByHexCode = async (req, res) => {
    try {
        const { hexCode } = req.params;
        const modelData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            image: req.body.image,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            balance: req.body.balance,
        }
        if(req.body.password)
        {
            modelData={...modelData,...{password:bcrypt.hashSync(req.body.password, 10)}};
        }
        const response = await User.update(modelData,{
            where:{ hex_code: hexCode }
        }).then((data) => {
            const res = { error: false, data:data, message: 'Usuario actualizado'};
            return res;
        }).catch(err => {
            const res = { error: true, message:err };
            return res;
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

userController.logInUser = async (req, res) => {
    try {
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) {
                return res.status(401).send({
                    message: 'El usuario o la contraseña no existe'
                });
            }
            const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if (!passwordIsValid) {
                return res.status(401).send({message: 'El usuario o la contraseña no existe'});
            }
            const tokenAccess = jwt.sign(
                {
                    hex_code: user.hex_code
                }, process.env.TOKENJSW,{
                    expiresIn:86400
                }
            );
            user.token = tokenAccess;
            res.status(200).send({
                user,
                tokenAccess
            })
        })
    } catch (error) {
        console.log(error);
    }
}

userController
module.exports = userController;