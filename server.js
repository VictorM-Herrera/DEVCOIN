require("dotenv").config({ path: "./.env" });
const express = require("express");
const server = express();
const port = process.env.PORT || 3010;
const cors = require("cors");

//test:
// const userController = require('./controllers/user.controller');
// const { ValidateUser } = require('./models/user.model');
// const uploadMulter = require('./config/multer.config');

// const errorHandler = require("./middlewares/errorHandler");
// const indexRoutes = require("./routes/index.route.js");


//mysql connections:
require("./config/connections");

//Middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Route:
// server.use(errorHandler);
// server.use(express.static(__dirname));
// server.use("/", indexRoutes);
// server.post('/users', [ValidateUser], userController.createUser);

server.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
