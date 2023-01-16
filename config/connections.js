const DBMysql = require("./mysql.config");
const { User } = require("../models/user.model");
const { Rol } = require('../models/rol.model');

// User.sync({force: true}).then(()=> {
//   console.log('tabla de usuarios eliminada y vuelta a crear');
// })


Rol.sync();
User.sync();//actualizar para q tenga el rol xD


DBMysql.sync()
  .then(() => console.log("Conectado con exito a PlanetScale"))
  .catch((err) => console.log(err));
