import { Router } from 'express';
import { getSummaryByPeriod } from '../controllers/SummaryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', [authMiddleware], getSummaryByPeriod);

export default router;
