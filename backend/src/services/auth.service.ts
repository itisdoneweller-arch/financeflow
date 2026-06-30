import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import logger from '../utils/logger';

export class AuthService {
  async register(email: string, password: string, name: string) {
    try {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
        },
      });

      return { id: user.id, email: user.email, name: user.name };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user || !user.password) {
        throw new Error('Invalid credentials');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid credentials');
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: process.env.JWT_EXPIRE || '24h' }
      );

      return { token, user: { id: user.id, email: user.email, name: user.name } };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async logout(userId: string) {
    // In a real app, invalidate tokens in Redis
    logger.info(`User ${userId} logged out`);
  }
}

export default new AuthService();
