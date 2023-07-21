const { Sequelize, DataTypes, Model } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test1', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


class Test extends Model { }

Test.init({
    // Model attributes are defined here
    test_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    test_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    test_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    test_isactive: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName: 'Test' // We need to choose the model name
});
module.exports = Test;
console.log(Test === sequelize.models.Test); // true

// async function testConn() {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// }

// testConn();
