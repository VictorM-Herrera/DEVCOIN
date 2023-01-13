const DBMysql = require("./mysql.config");

DBMysql.sync()
  .then(() => console.log("Conectado con exito a PlanetScale"))
  .catch((err) => console.log(err));
