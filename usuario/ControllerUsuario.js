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
			res.json({ messageErr: "Ocorreu um erro na listagem, mas seu usuário foi cadastrado. Recarregue para tentar novamente!" })
		})
	}).catch(() => {
		res.statusCode = 500;
		res.json({ messageErr: "Ocorreu um erro no cadastro, verifique os dados e tente novamente" })
	})
});

// REALIZAR O LOGIN DE UM USUÁRIO
router.get("/login/:email/:senha", (req, res) => {
	const { email, senha } = req.params;

	Usuario.findOne({ where: { email } }).then(usuario => {
		if (usuario.senha === senha) {
			res.statusCode = 200;
			res.json(usuario)
		} else {
			res.send("A senha para este e-mail está incorreta")
		}
	}).catch(() => {
		res.send("Não encontramos usuário com este e-mail. Faça seu cadastro ou verifique o e-mail informado")
	})
})

// LISTAR TODOS OS USUÁRIOS
router.get("/usuarios", (req, res) => {
	Usuario.findAll().then(usuarios => {
		res.statusCode = 200;
		res.json(usuarios)
	}).catch(() => {
		res.statusCode = 500;
		res.json({ messageErr: "Ocorreu um erro na listagem. Recarregue para tentar novamente!" })
	})
});

// EXCLUÍR USUÁRIO
router.delete("/usuario/:email", (req, res) => {
	const { email } = req.params;

	Usuario.destroy({ where: { email } }).then(() => {
		res.statusCode = 200;
		Usuario.findAll().then(usuarios => {
			res.json(usuarios)
		}).catch(() => {
			res.json({ messageErr: "Ocorreu um erro na listagem, mas o usuário foi excluído. Recarregue para tentar novamente!" })
		})
	}).catch(() => {
		res.statusCode = 500;
	})
})

module.exports = router