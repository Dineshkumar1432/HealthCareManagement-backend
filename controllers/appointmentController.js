const connectDB = require('../databases/database');

const getAppointments = async (req, res) => {
    try {
        const db = await connectDB();
        const appointments = await db.all('SELECT * FROM appointments');
        res.json({ success: true, appointments });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const bookAppointment = async (req, res) => {
    try {
        const db = await connectDB();
        const { doctorId, date, time, consultationType, symptoms } = req.body;
        const result = await db.run(
            `INSERT INTO appointments (doctorId, patientId, date, time, consultationType, symptoms, status)
             VALUES (?, ?, ?, ?, ?, ?, 'scheduled')`,
            [doctorId, req.user.id, date, time, consultationType, symptoms]
        );
        res.json({ success: true, message: 'Appointment booked', appointmentId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getDoctorSlots = async (req, res) => {
    try {
        const db = await connectDB();
        const doctorId = req.params.id;
        const slots = await db.all('SELECT * FROM slots WHERE doctorId = ?', [doctorId]);
        res.json({ success: true, slots });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const addSlot = async (req, res) => {
    try {
        const db = await connectDB();
        const { date, time } = req.body;
        const result = await db.run(
            `INSERT INTO slots (doctorId, date, time, isAvailable)
             VALUES (?, ?, ?, 1)`,
            [req.user.id, date, time]
        );
        res.json({ success: true, message: 'Slot added', slotId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const cancelAppointment = async (req, res) => {
    try {
        const db = await connectDB();
        const appointmentId = req.params.id;

        await db.run(`UPDATE appointments SET status = 'cancelled' WHERE id = ?`, [appointmentId]);
        res.json({ success: true, message: 'Appointment cancelled' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getAppointments, bookAppointment, getDoctorSlots, addSlot, cancelAppointment };

