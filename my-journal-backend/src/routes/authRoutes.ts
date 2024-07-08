import { Router } from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/AuthController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/profile', [authMiddleware], updateUserProfile);

export default router;
