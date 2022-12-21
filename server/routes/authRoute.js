import express from 'express';

import {
  loginUser,
  registerUser,
  getProfile,
} from '../controllers/authController.js';
import { verifyUser } from '../middlewares/verifyToken.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);

router.get('/profile', verifyUser, getProfile);

export default router;
