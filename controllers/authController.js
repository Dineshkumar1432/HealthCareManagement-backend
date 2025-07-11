const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('../databases/database');

const registerPatient = async (req, res) => {
    try {
        const db = await connectDB();
        const { name, email, password, phone, bloodGroup, dateOfBirth, gender } = req.body;

        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run(
            `INSERT INTO users (name, email, password, phone, role, bloodGroup, dateOfBirth, gender)
             VALUES (?, ?, ?, ?, 'patient', ?, ?, ?)`,
            [name, email, hashedPassword, phone, bloodGroup, dateOfBirth, gender]
        );

        const token = jwt.sign({ id: result.lastID, role: 'patient' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Registration successful', userId: result.lastID, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const registerDoctor = async (req, res) => {
    try {
        const db = await connectDB();
        const { name, email, password, phone, specializations, qualification, registrationNumber, registrationCouncil, experience } = req.body;

        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const userResult = await db.run(
            `INSERT INTO users (name, email, password, phone, role)
             VALUES (?, ?, ?, ?, 'doctor')`,
            [name, email, hashedPassword, phone]
        );

        await db.run(
            `INSERT INTO doctors (userId, specializations, qualification, registrationNumber, registrationCouncil, experience)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [userResult.lastID, JSON.stringify(specializations), qualification, registrationNumber, registrationCouncil, experience]
        );

        const token = jwt.sign({ id: userResult.lastID, role: 'doctor' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ success: true, message: 'Doctor registration successful', userId: userResult.lastID, token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const login = async (req, res) => {
    try {
        const db = await connectDB();
        const { email, password, role } = req.body;

        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user || user.role !== role) return res.status(400).json({ message: 'Invalid credentials' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);

        res.json({ success: true, message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const db = await connectDB();
        const users = await db.all('SELECT id, name, email, phone, role FROM users');
        res.json({ success: true, users });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { registerPatient, registerDoctor, login, getAllUsers };
