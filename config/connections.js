const DataBase = require('./mysql.config');

DataBase.sync()
    .then(() => console.log('Conectado con exito a la base de datos en PlanetScale'))
    .catch(err=> console.log(err));