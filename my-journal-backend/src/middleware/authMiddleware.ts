import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: number;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  const jwtSecret = process.env.JWT_SECRET as string;

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' });
    }

    req.userId = (decoded as DecodedToken).id;
    next();
  });
};
