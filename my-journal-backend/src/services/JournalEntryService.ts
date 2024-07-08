import { AppDataSource } from '../data-source';
import { JournalEntry } from '../entities/JournalEntry';

export class JournalEntryService {
  static async createEntry(userId: number, title: string, content: string, category: string, date: Date) {
    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    const entry = journalEntryRepository.create({ userId, title, content, category, date });
    await journalEntryRepository.save(entry);
    return entry;
  }

  static async getEntries(userId: number) {
    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    return await journalEntryRepository.find({ where: { userId } });
  }

  static async updateEntry(id: number, title: string, content: string, category: string, date: Date) {
    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    const entry = await journalEntryRepository.findOne({ where: { id } });
    if (!entry) {
      throw new Error('Journal entry not found');
    }
    entry.title = title;
    entry.content = content;
    entry.category = category;
    entry.date = date;
    await journalEntryRepository.save(entry);
    return entry;
  }

  static async deleteEntry(id: number) {
    const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
    await journalEntryRepository.delete({ id });
  }
}
