import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { personalDetails, resumeDetails } from '../controllers/candidateFunctions.js';

const router = express.Router();

router.post('/personal',isAuthenticated, personalDetails);
router.post('/resume',isAuthenticated, resumeDetails);

export default router