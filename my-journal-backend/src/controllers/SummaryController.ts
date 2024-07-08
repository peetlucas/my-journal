import { Request, Response } from 'express';
import { Between } from 'typeorm';
import { AppDataSource } from '../data-source';
import { JournalEntry } from '../entities/JournalEntry';

export const getSummaryByPeriod = async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'startDate and endDate are required' });
  }

  try {
    const start = new Date(startDate as string);
    const end = new Date(endDate as string);

    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    const entries = await journalEntryRepository.find({
      where: {
        userId: res.locals.jwtPayload.userId,
        date: Between(start, end),
      },
    });

    // Implement summary logic here based on entries fetched
    // Example: Calculate total entries, average length, etc.

    res.status(200).json({ entries });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch summary' });
  }
};
