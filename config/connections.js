const DBMysql = require("./mysql.config");
const { User } = require("../models/user.model");
const { Rol } = require("../models/rol.model");
const { Wallet } = require("../models/wallet.model");
const { Coins } = require("../models/coins.model");

// User.sync({force: true}).then(()=> {
//   console.log('tabla de usuarios eliminada y vuelta a crear');
// })

User.hasOne(Wallet, {
  foreignKey: "hex_code",
  sourceKey: "user_id",
});

Wallet.belongsTo(User, {
  foreignKey: "hex_code",
  targetKey: "user_id",
});

Wallet.hasMany(Coins, {
  foreignKey: "amount",
  sourceKey: "wallet_id",
});

Coins.belongsTo(Wallet, {
  foreignKey: "amount",
  targetKey: "wallet_id",
});

User.sync();
Wallet.sync();
Coins.sync();
Rol.sync();

DBMysql.sync()
  .then(() => console.log("Conectado con exito a PlanetScale"))
  .catch((err) => console.log(err));
