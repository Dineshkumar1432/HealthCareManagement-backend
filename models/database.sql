-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    phone TEXT,
    role TEXT NOT NULL, -- 'patient' or 'doctor'
    bloodGroup TEXT,
    dateOfBirth TEXT,
    gender TEXT
);

-- Doctors Table
CREATE TABLE IF NOT EXISTS doctors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER,
    specializations TEXT,
    qualification TEXT,
    registrationNumber TEXT,
    registrationCouncil TEXT,
    experience INTEGER,
    consultationFee INTEGER,
    FOREIGN KEY (userId) REFERENCES users (id)
);

-- Clinics Table
CREATE TABLE IF NOT EXISTS clinics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    address TEXT,
    city TEXT,
    facilities TEXT,
    operatingHours TEXT
);

-- Doctor-Clinic Association
CREATE TABLE IF NOT EXISTS doctor_clinics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    clinicId INTEGER,
    timings TEXT,
    roomNumber TEXT,
    FOREIGN KEY (doctorId) REFERENCES doctors (id),
    FOREIGN KEY (clinicId) REFERENCES clinics (id)
);

-- Appointments Table
CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    patientId INTEGER,
    clinicId INTEGER,
    date TEXT,
    time TEXT,
    consultationType TEXT,
    status TEXT,
    symptoms TEXT,
    paymentStatus TEXT,
    FOREIGN KEY (doctorId) REFERENCES doctors (id),
    FOREIGN KEY (patientId) REFERENCES users (id)
);

-- Availability Slots Table
CREATE TABLE IF NOT EXISTS slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    date TEXT,
    time TEXT,
    isAvailable INTEGER,
    FOREIGN KEY (doctorId) REFERENCES doctors (id)
);

-- Medical Records Table
CREATE TABLE IF NOT EXISTS medical_records (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER,
    title TEXT,
    type TEXT,
    date TEXT,
    fileUrl TEXT,
    uploadedBy TEXT,
    FOREIGN KEY (patientId) REFERENCES users (id)
);

-- Prescriptions Table
CREATE TABLE IF NOT EXISTS prescriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    appointmentId INTEGER,
    doctorId INTEGER,
    patientId INTEGER,
    details TEXT,
    notes TEXT,
    FOREIGN KEY (appointmentId) REFERENCES appointments (id),
    FOREIGN KEY (doctorId) REFERENCES doctors (id),
    FOREIGN KEY (patientId) REFERENCES users (id)
);

-- Lab Tests Table
CREATE TABLE IF NOT EXISTS lab_tests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    packageName TEXT,
    tests TEXT,
    price REAL,
    discountedPrice REAL,
    fastingRequired INTEGER,
    homeCollection INTEGER,
    reportTime TEXT
);

-- Consultations Table
CREATE TABLE IF NOT EXISTS consultations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    patientId INTEGER,
    startTime TEXT,
    duration INTEGER,
    status TEXT,
    notes TEXT,
    FOREIGN KEY (doctorId) REFERENCES doctors (id),
    FOREIGN KEY (patientId) REFERENCES users (id)
);

-- Reviews Table
CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    doctorId INTEGER,
    patientId INTEGER,
    appointmentId INTEGER,
    rating INTEGER,
    review TEXT,
    recommendDoctor INTEGER,
    waitTime TEXT,
    FOREIGN KEY (doctorId) REFERENCES doctors (id),
    FOREIGN KEY (patientId) REFERENCES users (id),
    FOREIGN KEY (appointmentId) REFERENCES appointments (id)
);

-- Reminders Table
CREATE TABLE IF NOT EXISTS reminders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    patientId INTEGER,
    medicineName TEXT,
    times TEXT,
    duration INTEGER,
    startDate TEXT,
    FOREIGN KEY (patientId) REFERENCES users (id)
);
