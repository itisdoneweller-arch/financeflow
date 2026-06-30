import prisma from '../config/database';
import logger from '../utils/logger';

export class ExpenseService {
  async createExpense(
    userId: string,
    data: {
      description: string;
      amount: number;
      category: string;
      date: Date;
    }
  ) {
    try {
      const expense = await prisma.expense.create({
        data: {
          ...data,
          userId,
          currency: 'USD',
        },
      });

      return expense;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getExpenses(userId: string, limit = 50, offset = 0) {
    try {
      const expenses = await prisma.expense.findMany({
        where: { userId },
        take: limit,
        skip: offset,
        orderBy: { date: 'desc' },
      });

      const total = await prisma.expense.count({ where: { userId } });

      return { expenses, total };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  async getExpensesByCategory(userId: string) {
    try {
      const expenses = await prisma.expense.groupBy({
        by: ['category'],
        where: { userId },
        _sum: { amount: true },
        _count: true,
      });

      return expenses;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}

export default new ExpenseService();
