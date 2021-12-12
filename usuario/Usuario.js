const Sequelize = require("sequelize");
const conn = require("../database/database");

const Usuario = conn.define('usuarios', {
	email: {
		type: Sequelize.STRING,
		primaryKey: true
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	senha: {
		type: Sequelize.STRING,
		allowNull: false
	},
	nascimento: {
		type: Sequelize.DATEONLY,
		allowNull: false
	}
})

// Usuario.sync({force: false}).then(() => {console.log('Tabela de usuarios criada')});

module.exports = Usuario;