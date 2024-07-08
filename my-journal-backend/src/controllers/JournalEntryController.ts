import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { JournalEntry } from '../entities/JournalEntry';

export const getAllEntries = async (req: Request, res: Response) => {
  const journalEntryRepository = AppDataSource.getRepository(JournalEntry);

  try {
    const entries = await journalEntryRepository.find({
      where: { userId: res.locals.jwtPayload.userId },
    });
    res.status(200).json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch entries' });
  }
};

export const addEntry = async (req: Request, res: Response) => {
  const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
  const { title, content, category, date } = req.body;

  try {
    const newEntry = journalEntryRepository.create({
      title,
      content,
      category,
      date,
      userId: res.locals.jwtPayload.userId,
    });

    await journalEntryRepository.save(newEntry);
    res.status(201).json({ message: 'Entry added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add entry' });
  }
};

export const updateEntry = async (req: Request, res: Response) => {
  const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
  const entryId = parseInt(req.params.id, 10); // Convert entryId to number
  const { title, content, category, date } = req.body;

  try {
    const entry = await journalEntryRepository.findOneBy({ id: entryId });

    if (!entry) {
      res.status(404).json({ error: 'Entry not found' });
      return;
    }

    if (title) {
      entry.title = title;
    }

    if (content) {
      entry.content = content;
    }

    if (category) {
      entry.category = category;
    }

    if (date) {
      entry.date = date;
    }

    await journalEntryRepository.save(entry);

    res.status(200).json({ message: 'Entry updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update entry' });
  }
};

export const deleteEntry = async (req: Request, res: Response) => {
  const journalEntryRepository = AppDataSource.getRepository(JournalEntry);
  const entryId = parseInt(req.params.id, 10); // Convert entryId to number

  try {
    await journalEntryRepository.delete({ id: entryId });
    res.status(200).json({ message: 'Entry deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete entry' });
  }
};
