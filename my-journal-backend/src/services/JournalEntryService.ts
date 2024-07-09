import prisma from '../../prisma/prismaClient';

export const JournalEntryService = {
  async createEntry(userId: number, title: string, content: string, category: string, date: Date) {
    return await prisma.journalEntry.create({
      data: { title, content, category, date, userId }
    });
  },

  async getEntries(userId: number) {
    return await prisma.journalEntry.findMany({ where: { userId } });
  },

  async updateEntry(id: number, title: string, content: string, category: string, date: Date) {
    return await prisma.journalEntry.update({
      where: { id },
      data: { title, content, category, date }
    });
  },

  async deleteEntry(id: number) {
    await prisma.journalEntry.delete({ where: { id } });
  }
};
