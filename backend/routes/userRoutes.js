import express from 'express';
import { 
    getUserProfile, 
    updateUserProfile,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

router.get('/all', protect, admin, getAllUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUserById);
router.delete('/:id', protect, admin, deleteUser);

export default router;

