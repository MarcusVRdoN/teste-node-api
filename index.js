// imports
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

// Settings
const config = require("./config/config");

// routes
const routeIndex = require("./routes/index");
const routeUsers = require("./routes/users");

// server
const app = express();

const url = config.dbUrl;
const options = {
  reconectTries: Number.MAX_VALUE,
  reconectInterval: 500,
  useNewUrlParser: true
};

mongoose.connect(url, options);
mongoose.set("userCreateIndex", true);

mongoose.connection.on("error", function(erro) {
  console.log("Erro na conexão com o banco de dados!", erro);
});
mongoose.connection.on("disconnected", function() {
  console.log("Aplicação desconectado do banco de dados!");
});
mongoose.connection.on("connected", function() {
  console.log("Aplicação conectada ao banco de dados!");
});

//
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routeIndex);
app.use("/users", routeUsers);

//
app.listen("3000");