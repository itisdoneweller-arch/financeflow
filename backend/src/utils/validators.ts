import { z } from 'zod';

export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
});

export const expenseSchema = z.object({
  description: z.string(),
  amount: z.number().positive('Amount must be positive'),
  category: z.string(),
  date: z.date(),
});

export const budgetSchema = z.object({
  category: z.string(),
  monthlyLimit: z.number().positive(),
  period: z.enum(['weekly', 'monthly', 'yearly']),
});

export const goalSchema = z.object({
  title: z.string(),
  type: z.string(),
  targetAmount: z.number().positive(),
  targetDate: z.date(),
});
