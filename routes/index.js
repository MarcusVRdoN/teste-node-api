const auth = require("../middlewares/auth");
const express = require("express");

//
const router = express.Router();

router.get("/", auth, async function(req, res) {
  try {
    return res.send(
      `
        <h1>Tudo certo</h1>
        <p>Você estas são as informações da página!</p>
      `
    );
  }
  catch(error) {
    return res.send("Erro ao tentar acessar a página inicial!");
  }
});

router.post("/", auth, async function(req, res) {
  try {
    return res.send("<h1>Post Index</h1>");
  }
  catch(error) {
    return res.send("Erro ao tentar postar na página inicial!");
  }
});

module.exports = router;