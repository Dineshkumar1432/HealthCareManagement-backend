const connectDB = require('../databases/database');

const getMedicalRecords = async (req, res) => {
    try {
        const db = await connectDB();
        const records = await db.all('SELECT * FROM medical_records WHERE patientId = ?', [req.user.id]);
        res.json({ success: true, records });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const uploadMedicalRecord = async (req, res) => {
    try {
        const db = await connectDB();
        const { title, type, date, fileUrl } = req.body;
        const result = await db.run(
            `INSERT INTO medical_records (patientId, title, type, date, fileUrl)
             VALUES (?, ?, ?, ?, ?)`,
            [req.user.id, title, type, date, fileUrl]
        );
        res.json({ success: true, message: 'Medical record uploaded', recordId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getPrescriptions = async (req, res) => {
    try {
        const db = await connectDB();
        const prescriptions = await db.all('SELECT * FROM prescriptions WHERE patientId = ?', [req.user.id]);
        res.json({ success: true, prescriptions });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getMedicalRecords, uploadMedicalRecord, getPrescriptions };

