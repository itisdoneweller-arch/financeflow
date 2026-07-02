# FinanceFlow 💰

An AI-powered financial literacy platform designed to help users learn personal finance, build healthy money habits, and achieve financial freedom through personalized learning, practical tools, and community support.

## 🌟 Features

### 📚 Interactive Learning
- **AI-Personalized Courses** - Adaptive learning paths based on user profile and goals
- **Expert Lessons** - Comprehensive modules covering financial concepts
- **Interactive Quizzes** - Test knowledge with gamified assessments
- **Progress Tracking** - Monitor learning journey with detailed analytics

### 💳 Financial Management Tools
- **Smart Expense Tracking** - AI-powered receipt scanning and categorization
- **Budget Planning** - Set category budgets and track spending
- **Financial Goals** - Create and monitor savings and investment targets
- **Reports & Analytics** - Visualize spending patterns and financial health

### 🤖 AI Financial Assistant
- **Educational Chatbot** - Get personalized financial advice and guidance
- **Learning Path Generation** - Custom learning recommendations
- **Receipt Analysis** - Automatic expense categorization from images
- **Real-time Support** - WebSocket-based instant responses

### 👥 Community Features
- **Discussion Forums** - Connect with other learners
- **Knowledge Sharing** - Share tips and experiences
- **Peer Support** - Ask questions and help others
- **Expert Moderation** - Quality discussions maintained

### 🏆 Gamification
- **Achievement Badges** - Unlock badges for milestones
- **Streaks & Challenges** - Maintain learning streaks
- **Leaderboards** - Friendly competitions
- **XP Points** - Earn points for activities

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker & Docker Compose (optional)

### Development Setup

```bash
# Clone repository
git clone https://github.com/itisdoneweller-arch/financeflow.git
cd financeflow

# Start services with Docker
docker-compose up -d

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup environment variables
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env.local

# Initialize database
cd backend
npx prisma migrate dev
npx prisma db seed

# Start development servers
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

**Access Points:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Database UI (Prisma Studio): http://localhost:5555

## 📁 Project Structure

```
financeflow/
├── frontend/                 # Next.js 14 React application
│   ├── app/                 # Next.js App Router
│   ├── components/          # Reusable React components
│   ├── lib/                 # Utilities and helpers
│   ├── styles/              # Tailwind CSS styles
│   └── public/              # Static assets
├── backend/                 # Node.js/Express REST API
│   ├── src/
│   │   ├── index.ts         # Application entry point
│   │   ├── config/          # Configuration (DB, Redis, etc.)
│   │   ├── middleware/      # Express middleware
│   │   ├── routes/          # API route definitions
│   │   ├── services/        # Business logic
│   │   ├── ai/              # AI service integrations
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Helper utilities
│   ├── prisma/
│   │   ├── schema.prisma    # Database schema
│   │   └── migrations/      # Database migrations
│   └── tests/               # Test files
├── docs/                    # Documentation
│   ├── API.md              # API endpoint documentation
│   ├── DEPLOYMENT.md       # Deployment instructions
│   └── GETTING_STARTED.md  # Getting started guide
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
├── docker-compose.yml      # Docker Compose config
├── CONTRIBUTING.md         # Contribution guidelines
├── SECURITY.md             # Security policy
└── README.md               # This file
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS + shadcn/ui components
- **State Management:** Zustand
- **Forms:** React Hook Form + Zod
- **HTTP Client:** Axios
- **Charts:** Recharts
- **Real-time:** Socket.io
- **Auth:** NextAuth.js
- **Testing:** Jest + React Testing Library

### Backend
- **Runtime:** Node.js 18+
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL 14+ (Prisma ORM)
- **Cache:** Redis
- **Real-time:** Socket.io
- **Authentication:** JWT
- **AI Services:** OpenAI, Anthropic, Google AI
- **Email:** SendGrid
- **File Storage:** AWS S3
- **Task Queue:** Bull
- **Logging:** Pino
- **Validation:** Zod

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel (frontend), Railway/Render (backend)
- **Database:** AWS RDS
- **Cache:** ElastiCache
- **CDN:** Cloudflare

## 📖 Documentation

- **[Getting Started](./docs/GETTING_STARTED.md)** - Setup and first steps
- **[API Documentation](./docs/API.md)** - Comprehensive API reference
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - Production deployment
- **[Contributing Guide](./CONTRIBUTING.md)** - How to contribute
- **[Security Policy](./SECURITY.md)** - Security guidelines

## 🧪 Testing

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch

# Run specific test
npm test -- auth.test.ts
```

## 📝 Available Commands

### Frontend
```bash
cd frontend

npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Backend
```bash
cd backend

npm run dev          # Start development server (with hot reload)
npm run build        # Compile TypeScript
npm start            # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Check TypeScript types
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report

# Database commands
npm run db:migrate   # Run pending migrations
npm run db:generate  # Generate Prisma client
npm run db:seed      # Seed database with initial data
npm run db:reset     # Reset database (development only)
npm run db:studio    # Open Prisma Studio UI
```

## 🌍 Environment Variables

### Backend (.env.local)
```env
# Server
NODE_ENV=development
PORT=3001

# Database
DATABASE_URL=postgresql://financeflow:password@localhost:5432/financeflow_dev

# Redis
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your-secret-key
JWT_EXPIRE=24h
REFRESH_TOKEN_EXPIRE=7d

# AI APIs
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_AI_API_KEY=...

# Email
SENDGRID_API_KEY=SG....
EMAIL_FROM=noreply@financeflow.com

# AWS
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
AWS_S3_BUCKET=financeflow-dev

# Logging
LOG_LEVEL=debug

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
NEXT_PUBLIC_GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

## 🚀 Deployment

### Quick Deploy (Staging)
```bash
git push origin develop  # Triggers auto-deploy to staging
```

### Production Deploy
```bash
git push origin main     # Triggers auto-deploy to production
```

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

## 🔒 Security

- ✅ JWT-based authentication with refresh tokens
- ✅ Bcrypt password hashing
- ✅ OAuth 2.0 support (Google, Apple)
- ✅ Two-factor authentication (TOTP)
- ✅ Rate limiting and CORS protection
- ✅ SQL injection prevention (Prisma)
- ✅ XSS protection
- ✅ CSRF tokens
- ✅ Environment variable validation
- ✅ Regular security audits

See [SECURITY.md](./SECURITY.md) for security policy and reporting.

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for:
- Code of conduct
- Development setup
- Branch naming conventions
- Commit message guidelines
- Pull request process
- Code style standards
- Testing requirements

### Quick Contribution Flow
```bash
# 1. Create feature branch
git checkout -b feature/your-feature

# 2. Make changes and commit
git commit -m "feat(scope): description"

# 3. Push and create PR
git push origin feature/your-feature
```

## 📞 Support

- **Documentation:** [docs/](./docs)
- **Issues:** [GitHub Issues](https://github.com/itisdoneweller-arch/financeflow/issues)
- **Discussions:** [GitHub Discussions](https://github.com/itisdoneweller-arch/financeflow/discussions)
- **Email:** support@financeflow.com
- **Security:** security@financeflow.com

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🎯 Vision

To democratize financial literacy and empower millions of people to take control of their financial futures through AI-powered education, practical tools, and community support.

---

**Made with ❤️ by the FinanceFlow Team**

Join us in building the future of financial education! 🚀
