import express from "express";
import { getAllJobs } from "../controllers/jobFunctions.js";
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.get('/topdetails',isAuthenticated,getAllJobs);

export default router;