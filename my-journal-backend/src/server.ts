import 'reflect-metadata';

import express, { Request, Response } from 'express';
import { authMiddleware } from './middleware/authMiddleware';
import { AuthService } from './services/AuthService';
import { JournalEntryService } from './services/JournalEntryService';
import { SummaryService } from './services/SummaryService';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

interface SignupRequestBody {
  email: string;
  password: string;
  username: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

interface JournalEntryRequestBody {
  title: string;
  content: string;
  category: string;
  date: Date;
}

type Period = 'daily' | 'weekly' | 'monthly';

// Auth routes
app.post('/signup', async (req: Request<{}, any, SignupRequestBody>, res: Response) => {
  try {
    const user = await AuthService.signUp(req.body.email, req.body.password, req.body.username);
    res.status(201).json(user);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.post('/login', async (req: Request<{}, any, LoginRequestBody>, res: Response) => {
  try {
    const { user, token } = await AuthService.login(req.body.email, req.body.password);
    res.status(200).json({ user, token });
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Journal entry routes
app.use(authMiddleware);

app.post('/entries', async (req: Request<{}, any, JournalEntryRequestBody>, res: Response) => {
  try {
    const date = new Date(req.body.date);
    const entry = await JournalEntryService.createEntry(req.userId as number, req.body.title, req.body.content, req.body.category, date);
    res.status(201).json(entry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.get('/entries', async (req: Request, res: Response) => {
  try {
    const entries = await JournalEntryService.getEntries(req.userId as number);
    res.status(200).json(entries);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.put('/entries/:id', async (req: Request<{ id: string }, any, JournalEntryRequestBody>, res: Response) => {
  try {
    const date = new Date(req.body.date);
    const entry = await JournalEntryService.updateEntry(parseInt(req.params.id, 10), req.body.title, req.body.content, req.body.category, date);
    res.status(200).json(entry);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.delete('/entries/:id', async (req: Request<{ id: string }>, res: Response) => {
  try {
    await JournalEntryService.deleteEntry(parseInt(req.params.id, 10));
    res.status(204).end();
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

// Summary routes
app.get('/summary/:period', async (req: Request<{ period: string }>, res: Response) => {
  try {
    const period = req.params.period as Period;
    if (!['daily', 'weekly', 'monthly'].includes(period)) {
      throw new Error('Invalid period');
    }
    const summary = await SummaryService.getSummary(req.userId as number, period);
    res.status(200).json(summary);
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
