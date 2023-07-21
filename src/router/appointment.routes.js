const router = require("express").Router();
const Appointment = require("../model/appointment.model");
const Relation = require("../model/relation.model");
const User = require("../model/user.model");
const { faker } = require("@faker-js/faker");


router.post("/appointments/:user_id/:date_id", async (req, res) => {
    const user_id = req.params.user_id;
    const date_id = req.params.date_id;

    await Relation.sync();

    const existingRelation = await Relation.findOne({
        where: { relation_user_id: user_id, relation_appointment: date_id }
    });

    if (existingRelation) {
        return res.status(409).json({
            ok: false,
            status: 409,
            message: "A relationship already exists for this user and appointment.",
        });
    }

    const getuser = await User.findOne({
        where: { user_id: user_id }
    })

    const updateTest = await Appointment.update({
        appointment_date: getuser.appointment_date,
        appointment_isused: true
    }, { where: { appointment_id: date_id } });


    const newtest = await Relation.create({
        relation_user_id: user_id,
        relation_appointment: req.params.date_id
    });

    res.status(201).json({
        ok: true,
        status: 201,
        message: "Apointment successfuly created",

    });
});

router.get("/appointments", async (req, res) => {
    // await Appointment.sync();
    const appointments = await Appointment.findAll({
        where: { appointment_isused: 0 }
    });
    res.status(200).json({
        ok: true,
        status: 200,
        body: appointments
    });

});


router.get("/bindappointments", async (req, res) => {
    addAppointments();
    res.status(200).json({
        ok: true,
        status: 200,
        message: "Se ha llenado la base de datos",
    });

});


async function addAppointments() {
    try {
        await Appointment.sync(); // Esto creará la tabla si aún no existe

        const startDate = new Date(); // Fecha de inicio (hoy)
        const days = 3; // Total de días

        const appointmentsToAdd = [];
        for (let day = 0; day < days; day++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + day);

            // Intervalo de 8:00 a 12:00
            for (let hour = 8; hour < 12; hour++) {
                const appointment = {
                    appointment_date: new Date(date).setHours(hour),
                    appointment_isused: false
                };
                appointmentsToAdd.push(appointment);
            }

            // Intervalo de 14:00 a 18:00
            for (let hour = 14; hour < 18; hour++) {
                const appointment = {
                    appointment_date: new Date(date).setHours(hour),
                    appointment_isused: false
                };
                appointmentsToAdd.push(appointment);
            }
        }

        const newAppointments = await Appointment.bulkCreate(appointmentsToAdd);

        console.log('Nuevos registros insertados:', newAppointments.map(a => a.toJSON()));
    } catch (error) {
        console.error('Error al insertar los registros:', error);
    }
}


module.exports = router;