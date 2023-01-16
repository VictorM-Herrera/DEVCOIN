//requires delas rutas:
//const userRouter = require('./user.route');
const transactionRoute = require("./transactionRoute");
const walletRoute = require("./walletRoute");
const coinsRoute = require("./coinsRoute");

//express:
const express = require("express");
const { required } = require("joi");
const indexRouter = express.Router();

//Uso de las rutas:
//indexRouter.use('/users', userRouter);
indexRouter.use("/transaction", transactionRoute);
indexRouter.use("/wallet", walletRoute);
indexRouter.use("/coins", coinsRoute);

module.exports = indexRouter;
