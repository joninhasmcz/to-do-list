const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../config/sequelize.db.config');

class Task extends Model {}

Task.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendente',
    },
    description: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: false,
});

module.exports = Task;
