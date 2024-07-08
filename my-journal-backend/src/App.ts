import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { AppDataSource } from './data-source';
import authRoutes from './routes/authRoutes'; 
import journalRoutes from './routes/journalRoutes'; 
import summaryRoutes from './routes/summaryRoutes'; 

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/auth', authRoutes);
app.use('/journal', journalRoutes);
app.use('/summary', summaryRoutes);

const PORT = process.env.PORT || 5000;

// Initialize the DataSource and start the server
AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => console.log('TypeORM connection error: ', error));
