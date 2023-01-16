//requires delas rutas:
//const userRouter = require('./user.route');
const transactionRoute = require("./transactionRoute");
const walletRoute = require("./walletRoute");

//express:
const express = require("express");
const indexRouter = express.Router();

//Uso de las rutas:
//indexRouter.use('/users', userRouter);
indexRouter.use("/transaction", transactionRoute);
indexRouter.use("/wallet", walletRoute);

module.exports = indexRouter;
