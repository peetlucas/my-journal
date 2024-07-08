import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../utils/jwtUtils';

export const registerUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = userRepository.create({ username, password: hashedPassword });
    await userRepository.save(newUser);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOne({ where: { username } });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid password' });
      return;
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  const userRepository = AppDataSource.getRepository(User);
  const userId = res.locals.jwtPayload.userId;
  const { username, password } = req.body;

  try {
    const user = await userRepository.findOneBy({ id: userId });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    if (username) {
      user.username = username;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }

    await userRepository.save(user);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile' });
  }
};
