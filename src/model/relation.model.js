const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test1', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


class Relation extends Model { }

Relation.init({
    // Model attributes are defined here
    relation_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    relation_user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    relation_appointment: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Relation' // We need to choose the model name
});
module.exports = Relation;
console.log(Relation === sequelize.models.Relation); // true
