//requires delas rutas:
//const userRouter = require('./user.route');
const transactionRoute = require("./transactionRoute");

//express:
const express = require("express");
const indexRouter = express.Router();

//Uso de las rutas:
//indexRouter.use('/users', userRouter);
indexRouter.use("/transaction", transactionRoute);

module.exports = indexRouter;
