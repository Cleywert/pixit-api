const Sequelize = require("sequelize");

const conn = new Sequelize("pixit","root","",{
    host: "localhost",
    dialect: "mysql",
});

module.exports = conn;