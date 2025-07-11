const connectDB = require('../databases/database');

const getLabTests = async (req, res) => {
    try {
        const db = await connectDB();
        const labTests = await db.all('SELECT * FROM lab_tests');
        res.json({ success: true, labTests });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const bookLabTest = async (req, res) => {
    try {
        const db = await connectDB();
        const { packageId, collectionType, address, preferredDate, preferredTime } = req.body;

        const result = await db.run(
            `INSERT INTO lab_test_bookings (patientId, packageId, collectionType, address, preferredDate, preferredTime)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [req.user.id, packageId, collectionType, JSON.stringify(address), preferredDate, preferredTime]
        );

        res.json({ success: true, message: 'Lab test booked', bookingId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getLabTests, bookLabTest };
