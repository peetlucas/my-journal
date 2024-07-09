import prisma from '../../prisma/prismaClient';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const AuthService = {
  async signUp(email: string, password: string, username: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, username }
    });
    return user;
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid email or password');
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return { user, token };
  }
};
