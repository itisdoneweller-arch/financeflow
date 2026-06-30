# FinanceFlow - Quick Start Guide

## 📋 Project Overview

FinanceFlow is an AI-powered financial literacy platform combining:
- **Interactive Learning** - Personalized courses and lessons
- **Financial Tools** - Expense tracking, budgeting, goal setting
- **AI Assistant** - Educational chatbot for financial guidance
- **Community** - Forum for peer support and knowledge sharing
- **Gamification** - Badges, streaks, and competitions

## 🚀 Quick Start (5 minutes)

### Option 1: Docker Compose (Easiest)

```bash
# Clone and setup
git clone https://github.com/itisdoneweller-arch/financeflow.git
cd financeflow

# Start all services
docker-compose up -d

# Install dependencies
cd frontend && npm install && cd ..
cd backend && npm install && cd ..

# Setup environment
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local

# Initialize database
cd backend && npx prisma migrate dev && npx prisma db seed

# Start development servers
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database UI: http://localhost:5555 (Prisma Studio)

### Option 2: Manual Setup

```bash
# Install PostgreSQL, Redis locally, then:
cd financeflow

# Backend
cd backend
npm install
cp .env.example .env.local
# Edit .env.local with your database credentials
npx prisma migrate dev
npx prisma db seed
npm run dev

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## 📁 Project Structure

```
financeflow/
├── frontend/          # Next.js React application
│   ├── app/          # App router (pages)
│   ├── components/   # React components
│   ├── lib/          # Utilities and helpers
│   └── styles/       # CSS and Tailwind
├── backend/          # Node.js/Express API
│   ├── src/
│   │   ├── routes/   # API endpoints
│   │   ├── services/ # Business logic
│   │   ├── ai/       # AI integrations
│   │   └── middleware/ # Auth, logging
│   ├── prisma/       # Database schema
│   └── tests/        # Test files
├── docs/             # Documentation
├── .github/          # GitHub workflows
└── docker-compose.yml # Local dev setup
```

## 🛠️ Available Commands

### Frontend
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm run type-check   # TypeScript check
npm test             # Run tests
```

### Backend
```bash
cd backend
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Run linter
npm test             # Run tests
npm run db:migrate   # Database migrations
npm run db:seed      # Seed initial data
npm run db:studio    # Open Prisma Studio
```

## 🔧 Environment Setup

### Backend (.env.local)
```env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://financeflow:dev_password_change_me@localhost:5432/financeflow_dev
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key  # For AI features
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-id
```

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# With coverage
cd backend && npm run test:coverage
cd frontend && npm run test:coverage
```

## 📚 API Examples

### Register User
```bash
curl -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }'
```

### Login
```bash
curl -X POST http://localhost:3001/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

### Create Expense
```bash
curl -X POST http://localhost:3001/api/v1/expenses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "description": "Grocery shopping",
    "amount": 45.99,
    "category": "food",
    "date": "2026-06-30T10:00:00Z"
  }'
```

## 🚀 Deployment

### Development
```bash
# Already running on localhost:3000 (frontend) and :3001 (backend)
```

### Staging
```bash
# Deploy to staging environment
git push origin develop
# Auto-deploys via GitHub Actions
```

### Production
```bash
# Deploy to production
git push origin main
# Auto-deploys via GitHub Actions
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 📖 Documentation

- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [System Architecture](./ARCHITECTURE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Contributing Guidelines](../CONTRIBUTING.md)

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000 or 3001
lsof -i :3000
kill -9 <PID>
```

### Database Connection Error
```bash
# Check PostgreSQL is running
pg_isready -h localhost

# Verify DATABASE_URL in .env.local
echo $DATABASE_URL
```

### Prisma Migration Issues
```bash
# Reset database (development only)
cd backend
npx prisma migrate reset

# Generate Prisma client
npx prisma generate
```

### Node/NPM Version Issues
```bash
# Check Node version (should be 18+)
node --version

# Use NVM to manage versions
nvm use 18
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/my-feature`
2. Make changes and commit: `git commit -m "feat: add my feature"`
3. Push to branch: `git push origin feature/my-feature`
4. Open a Pull Request

See [CONTRIBUTING.md](../CONTRIBUTING.md) for detailed guidelines.

## 📝 License

MIT License - See [LICENSE](../LICENSE) file

## 🆘 Need Help?

- Check [documentation](./docs)
- Open an [issue](https://github.com/itisdoneweller-arch/financeflow/issues)
- Start a [discussion](https://github.com/itisdoneweller-arch/financeflow/discussions)
- Email: support@financeflow.com

## 🎯 Next Steps

1. ✅ Setup local development environment
2. 📖 Read the documentation
3. 🧪 Explore the codebase
4. 🚀 Start implementing features
5. 📬 Submit a pull request

Happy coding! 🎉
