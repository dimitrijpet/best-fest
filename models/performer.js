const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Performer = sequelize.define('Performer', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    is_disabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Performer;
