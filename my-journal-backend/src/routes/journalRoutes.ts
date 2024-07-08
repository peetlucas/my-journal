import { Router } from 'express';
import { getAllEntries, addEntry, updateEntry, deleteEntry } from '../controllers/JournalEntryController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.get('/', [authMiddleware], getAllEntries);
router.post('/', [authMiddleware], addEntry);
router.put('/:id', [authMiddleware], updateEntry);
router.delete('/:id', [authMiddleware], deleteEntry);

export default router;
