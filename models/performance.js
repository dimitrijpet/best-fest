const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Performer = require('./performer');

const Performance = sequelize.define('Performance', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    performance_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    performance_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    performer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Performer,
            key: 'id'
        }
    }
});

Performance.addHook('beforeValidate', async (performance, options) => {
    const existingPerformances = await Performance.count({
        where: {
            performer_id: performance.performer_id,
            performance_date: performance.performance_date
        }
    });

    if (existingPerformances >= 3) {
        throw new Error('This performer already has 3 performances on this date.');
    }
});

module.exports = Performance;
