import express from 'express';
import { getAllUsers, loginUser, registerUser } from '../controllers/userFunctions.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/all',isAuthenticated, getAllUsers);
router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;