const connectDB = require('../databases/database');

const addDoctorReview = async (req, res) => {
    try {
        const db = await connectDB();
        const { doctorId, appointmentId, rating, review, recommendDoctor, waitTime } = req.body;

        const result = await db.run(
            `INSERT INTO reviews (doctorId, patientId, appointmentId, rating, review, recommendDoctor, waitTime)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [doctorId, req.user.id, appointmentId, rating, review, recommendDoctor, waitTime]
        );

        res.json({ success: true, message: 'Review added', reviewId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getDoctorReviews = async (req, res) => {
    try {
        const db = await connectDB();
        const doctorId = req.params.doctorId;

        const reviews = await db.all('SELECT * FROM reviews WHERE doctorId = ?', [doctorId]);
        res.json({ success: true, reviews });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { addDoctorReview, getDoctorReviews };
