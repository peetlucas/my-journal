import { AppDataSource } from '../data-source';
import { JournalEntry } from '../entities/JournalEntry';
import { MoreThanOrEqual } from 'typeorm';

export class SummaryService {
  static async getSummary(userId: number, period: 'daily' | 'weekly' | 'monthly') {
    let date = new Date();
    if (period === 'daily') {
      date.setDate(date.getDate() - 1);
    } else if (period === 'weekly') {
      date.setDate(date.getDate() - 7);
    } else if (period === 'monthly') {
      date.setMonth(date.getMonth() - 1);
    }

    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    
    const entries = await journalEntryRepository.find({
      where: {
        userId,
        date: MoreThanOrEqual(date)
      }
    });

    return entries;
  }
}
