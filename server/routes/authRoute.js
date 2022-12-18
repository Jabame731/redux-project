import express from 'express';

import {
  login,
  register,
  getUserDetails,
} from '../controllers/authController.js';
import token from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/me', token, getUserDetails);

export default router;
