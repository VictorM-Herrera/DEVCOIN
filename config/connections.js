const DBMysql = require("./mysql.config");
const { User } = require("../models/user.model");

User.sync();

DBMysql.sync()
  .then(() => console.log("Conectado con exito a PlanetScale"))
  .catch((err) => console.log(err));
