const DBMysql = require("./mysql.config");
const { User } = require("../models/user.model");

// User.sync({force: true}).then(()=> {
//   console.log('tabla de usuarios eliminada y vuelta a crear');
// })
User.sync();

DBMysql.sync()
  .then(() => console.log("Conectado con exito a PlanetScale"))
  .catch((err) => console.log(err));
