import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import pinoHttp from 'pino-http';
import pino from 'pino';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const logger = pino();
const httpLogger = pinoHttp();

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(httpLogger);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes (to be implemented)
app.use('/api/v1/auth', (req, res) => {
  res.json({ message: 'Auth routes coming soon' });
});

app.use('/api/v1/users', (req, res) => {
  res.json({ message: 'User routes coming soon' });
});

app.use('/api/v1/expenses', (req, res) => {
  res.json({ message: 'Expense routes coming soon' });
});

app.use('/api/v1/courses', (req, res) => {
  res.json({ message: 'Course routes coming soon' });
});

app.use('/api/v1/ai', (req, res) => {
  res.json({ message: 'AI routes coming soon' });
});

// Socket.io events
io.on('connection', (socket) => {
  logger.info(`User connected: ${socket.id}`);

  socket.on('disconnect', () => {
    logger.info(`User disconnected: ${socket.id}`);
  });
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

const PORT = parseInt(process.env.PORT || '3001', 10);

httpServer.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;
