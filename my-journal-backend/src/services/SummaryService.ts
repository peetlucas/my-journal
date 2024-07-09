import prisma from '../../prisma/prismaClient';

export const SummaryService = {
  async getSummary(userId: number, period: 'daily' | 'weekly' | 'monthly') {
    const today = new Date();
    let startDate: Date;

    switch (period) {
      case 'daily':
        startDate = new Date(today.setHours(0, 0, 0, 0));
        break;
      case 'weekly':
        const startOfWeek = today.getDate() - today.getDay() + 1;
        startDate = new Date(today.setDate(startOfWeek));
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'monthly':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      default:
        throw new Error('Invalid period');
    }

    const entries = await prisma.journalEntry.findMany({
      where: {
        userId,
        date: {
          gte: startDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });

    const summary = {
      period,
      startDate,
      entries,
      count: entries.length,
    };

    return summary;
  }
};
