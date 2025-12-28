import express from 'express';
import { registerUser, registerAdmin, loginUser } from '../controllers/authController.js'; 

const router = express.Router();

router.post('/register', registerUser);
router.post('/register-admin', registerAdmin);
router.post('/login', loginUser);

export default router; 