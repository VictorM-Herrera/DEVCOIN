const  { Rol } = require('../models/rol.model');
const rolController= {};

rolController.createRol = async ( req,res) => {
    const modelData = {
        rol_name: req.body.rol_name
    }
    const response = await Rol.create(modelData)
        .then((data) => {
            const res = {error: false, data:data};
            return res;
        }).catch(error => {
            const res = {error: true, data:data};
            return res;
        })
        res.json(response);
}

rolController.getAllRoles = async (req,res) => {
    const response = await Rol.findAll()
        .then((data) => {
            const res = {error: false, data: data}
            return res;
        }).catch((error) => {
            const res = {error: true, message: error}
            return res;
        })
    res.json(response);
}
module.exports = rolController;