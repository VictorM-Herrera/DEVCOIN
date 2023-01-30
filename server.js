require("dotenv").config({ path: "./.env" });
const express = require("express");
const server = express();
const port = process.env.PORT || 3010;
const cors = require("cors");
//mysql connections:
require("./config/connections");
const indexRoutes = require("./routes/indexRoute.js");
const errorHandler = require("./middlewares/errorHandler");

//Middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

//Route:
server.use(errorHandler);
server.use(indexRoutes);


server.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
