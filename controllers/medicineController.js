const connectDB = require('../databases/database');

const searchMedicines = async (req, res) => {
    try {
        const db = await connectDB();
        const { query } = req.body;
        const medicines = await db.all('SELECT * FROM medicines WHERE name LIKE ?', [`%${query}%`]);
        res.json({ success: true, medicines });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const orderMedicines = async (req, res) => {
    try {
        const db = await connectDB();
        const { prescriptionId, medicines, deliveryAddress } = req.body;

        const result = await db.run(
            `INSERT INTO medicine_orders (patientId, prescriptionId, medicines, deliveryAddress)
             VALUES (?, ?, ?, ?)`,
            [req.user.id, prescriptionId, JSON.stringify(medicines), JSON.stringify(deliveryAddress)]
        );

        res.json({ success: true, message: 'Medicine order placed', orderId: result.lastID });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { searchMedicines, orderMedicines };
