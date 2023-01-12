require("dotenv").config({ path: "./.env" });
const express = require("express");
const server = express();
const port = process.env.PORT || 3010;
const cors = require("cors");

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
