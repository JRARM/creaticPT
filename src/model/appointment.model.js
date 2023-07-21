const { Sequelize, DataTypes, Model } = require('sequelize');


const sequelize = new Sequelize('test1', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});


class Appointment extends Model { }

Appointment.init({

    appointment_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    appointment_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    appointment_isused: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize,
    modelName: 'Appointment'
});
module.exports = Appointment;
console.log(Appointment === sequelize.models.Appointment);

