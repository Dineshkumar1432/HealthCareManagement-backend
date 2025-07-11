
const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const roleCheck = require('../middleware/rollcheck');

const authController = require('../controllers/authController');
const appointmentController = require('../controllers/appointmentController');
const recordController = require('../controllers/recordController');
const labTestController = require('../controllers/labTestController');
const medicineController = require('../controllers/medicineController');
const reviewController = require('../controllers/reviewController');


router.post('/auth/patient/register', authController.registerPatient);
router.post('/auth/doctor/register', authController.registerDoctor);
router.post('/auth/login', authController.login);


router.get('/users', authenticateUser, authController.getAllUsers);


router.get('/appointments', authenticateUser, appointmentController.getAppointments);
router.post('/appointments', authenticateUser, roleCheck('patient'), appointmentController.bookAppointment);
router.put('/appointments/:id/cancel', authenticateUser, appointmentController.cancelAppointment);


router.get('/doctors/:id/slots', authenticateUser, appointmentController.getDoctorSlots);
router.post('/slots', authenticateUser, roleCheck('doctor'), appointmentController.addSlot);


router.get('/medical-records', authenticateUser, recordController.getMedicalRecords);
router.post('/medical-records', authenticateUser, roleCheck('patient'), recordController.uploadMedicalRecord);

router.get('/prescriptions', authenticateUser, recordController.getPrescriptions);
router.get('/lab-tests', authenticateUser, labTestController.getLabTests);
router.post('/lab-tests/book', authenticateUser, labTestController.bookLabTest);





router.post('/medicines/search', authenticateUser, medicineController.searchMedicines);
router.post('/medicines/order', authenticateUser, medicineController.orderMedicines);


router.post('/reviews/doctor', authenticateUser, roleCheck('patient'), reviewController.addDoctorReview);
router.get('/reviews/doctor/:doctorId', authenticateUser, reviewController.getDoctorReviews);

module.exports = router;

