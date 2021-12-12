const express = require("express");
const router = express.Router();
const Usuario = require("./Usuario");

// CADASTRAR USUÁRIO
router.post("/usuario", (req, res) => {
	const { nome, email, senha, nascimento } = req.body;

	Usuario.create({
		email,
		nome,
		senha,
		nascimento
	}).then(() => {
		res.statusCode = 200;
		Usuario.findAll().then(usuarios => {
			res.json(usuarios)
		}).catch(() => {
			res.json({messageErr: "Ocorreu um erro na listagem, mas seu usuário foi cadastrado. Recarregue para tentar novamente!"})
		})
	}).catch(() => {
		res.statusCode = 500;
		res.json({messageErr: "Ocorreu um erro no cadastro, verifique os dados e tente novamente"})
	})
});

// LISTAR TODOS OS USUÁRIOS
router.get("/usuarios", (req, res) => {
	Usuario.findAll().then(usuarios => {
		res.statusCode = 200;
		res.json(usuarios)
	}).catch(() => {
		res.statusCode = 500;
		res.json({messageErr: "Ocorreu um erro na listagem. Recarregue para tentar novamente!"})
	})
});

module.exports = router