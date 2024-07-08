import { DataSource } from 'typeorm';
import "reflect-metadata";
import { JournalEntry } from './entities/JournalEntry';

export const AppDataSource = new DataSource({
  type: 'postgres', // or any other database type you're using
  host: 'localhost',
  port: 5432,
  username: 'your-username',
  password: 'your-password',
  database: 'your-database',
  entities: [JournalEntry],
  synchronize: true, // Don't use this in production, set up migrations instead
});
