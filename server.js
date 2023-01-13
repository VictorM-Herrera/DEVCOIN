require("dotenv").config({ path: "./.env" });
const express = require("express");
const server = express();
const port = process.env.PORT || 3010;
const cors = require("cors");

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
server.get('/', (req,res) => {
  res.send({msg: 'Hola desde el internet'})
})

server.listen(port, () => {
  console.log(`Server in the port: ${port}`);
});
