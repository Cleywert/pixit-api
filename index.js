const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const cors = require("cors");

app.use(cors());

// Conexão com banco
connection.authenticate().then(() => {
    console.log("Conectado ao banco");
}).catch(err => {
    console.log(err);
})

// Setando o body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importando controllers
// Os models são importados nos arquivos de controllers e serão executados.
const ControllerUsuario = require('./usuario/ControllerUsuario');
app.use("/", ControllerUsuario)

// Setar porta da aplicação
app.listen(8000, () => {
    console.log("Servidor rodando na porta 8000")
}); 