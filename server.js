require("dotenv").config({ path: "./.env" });
const express = require("express");
const server = express();
const port = process.env.PORT || 3010;
const cors = require("cors");

//mysql connections:
// require("./config/connections");

//Middlewares
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// //Route:¡

server.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
