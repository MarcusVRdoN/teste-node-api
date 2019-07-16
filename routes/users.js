const express = require("express");
const bcrypt = require("bcrypt");

//
const Users = require("../model/user");

// Funções auxiliares
const helpers = require("../helpers/helpers");

//
const router = express.Router();

router.get("/", async function(req, res) {
  try {
    let users = await Users.find({});
    return res.send(users);
  }
  catch(error) {
    return res.status(500).send("Erro na consulta dos usuários!");
  }
});

router.post("/create", async function(req, res) {
  let login = req.body.email;
  let senha = req.body.password;

  if(!login || !senha) {
    return res.status(400).send("Dados insuficientes!");
  }

  try {
    if(await Users.findOne({ email: login })) {
      return res.status(400).send("Usuário já registrado!");
    }

    let usuario = await Users.create({ email: login, password: senha });

    usuario.password = undefined;

    return res.status(201).send({
      user: usuario,
      token: helpers.jwt.criarTokenUsuario(usuario.id)
    });
  }
  catch(error) {
    return res.status(500).send("Erro ao buscar usuário!");
  }
});

router.post("/auth", async function(req, res) {
  let login = req.body.email;
  let senha = req.body.password;

  if(!login || !senha) {
    return res.status(400).send("Dados insuficientes!");
  }

  try {
    let usuario = await Users.findOne({ email: login }).select("+password");
    if(!usuario) {
      return res.status(400).send("Usuário não registrado!");
    }

    let senhaOk = await bcrypt.compare(senha, usuario.password);
    if(!senhaOk) {
      return res.status(401).send("Senha inválida!");
    }

    usuario.password = undefined;

    return res.send({
      user: usuario,
      token: helpers.jwt.criarTokenUsuario(usuario.id)
    });
  }
  catch(error) {
    return res.status(500).send("Erro ao buscar usuário!");
  }
});

module.exports = router;
