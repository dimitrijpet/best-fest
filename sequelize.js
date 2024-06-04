const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('best-fest', 'dimitrij', 'Password12!', {
    host: 'localhost',
    dialect: 'postgres'
});

module.exports = sequelize;