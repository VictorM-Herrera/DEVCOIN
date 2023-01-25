const DBMysql = require("./mysql.config");
const { User } = require("../models/user.model");
const { Rol } = require("../models/rol.model");
const { Wallet } = require("../models/wallet.model");
const { Coins } = require("../models/coins.model");
const { Transaction } = require("../models/transactions.model");
const sequelize = require("./mysql.config");

// User.sync({force: true}).then(()=> {
//   console.log('tabla de usuarios eliminada y vuelta a crear');
// })

// Wallet.hasMany(Coins, {
//   foreignKey: "walletId",
//   sourceKey: "wallet_id",
// });

Coins.belongsTo(Wallet, {
  foreignKey: "walletId",
  targetKey: "wallet_id",
}); // cambio

Rol.sync();
User.sync();
Wallet.sync();
Coins.sync();
Transaction.sync();

// sequelize.drop().then(() => {
//   console.log("todo fue eliminado");
// });

DBMysql.sync()
  .then(() => console.log("Conectado con exito a Railway"))
  .catch((err) => console.log(err));
