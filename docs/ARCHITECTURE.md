# System Architecture - FinanceFlow

## Overview

FinanceFlow is built on a modern, scalable, and microservices-ready architecture that separates concerns between frontend, backend, and AI layers.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        Client Layer                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │  Web Browser │  │   Mobile App │  │  Progressive Web App │   │
│  └──────────────┘  └──────────────┘  └──────────────────────┘   │
└────────────────────────────┬──────────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                     CDN / Load Balancer                          │
│                      (Cloudflare)                                │
└────────────────────────────┬──────────────────────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   Frontend   │  │   API Gateway    │  │   Auth      │
│  (Next.js)   │  │   (Express)      │  │  Service    │
│   Vercel     │  │                  │  │             │
└──────────────┘  └──────────────────┘  └──────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   User       │  │   Learning       │  │   Financial  │
│  Service     │  │   Service        │  │   Service    │
└──────────────┘  └──────────────────┘  └──────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   Community  │  │   AI & Analytics │  │   Admin      │
│  Service     │  │   Service        │  │  Service     │
└──────────────┘  └──────────────────┘  └──────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│ PostgreSQL   │  │      Redis       │  │  AWS S3 /   │
│  Database    │  │      Cache       │  │ Cloud Storage│
└──────────────┘  └──────────────────┘  └──────────────┘
                             │
                             ▼
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
┌──────────────┐  ┌──────────────────┐  ┌──────────────┐
│   LLM APIs   │  │   Email Service  │  │  Monitoring │
│ (OpenAI, etc)│  │   (SendGrid)     │  │   (Sentry)   │
└──────────────┘  └──────────────────┘  └──────────────┘
```

## Core Components

### 1. Frontend Layer (Next.js)

**Location**: `frontend/`

**Responsibilities**:
- Serve web and PWA applications
- Handle client-side routing and state management
- Provide responsive UI for all devices
- Implement offline capabilities
- Handle authentication flows (NextAuth.js)

**Tech Stack**:
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Shadcn/ui components
- Zustand for state management
- Socket.io for real-time updates

### 2. API Gateway & Backend (Node.js/Express)

**Location**: `backend/src`

**Responsibilities**:
- Route incoming requests to appropriate services
- Handle authentication and authorization
- Rate limiting and request validation
- Logging and monitoring

**Structure**:
```
src/
├── routes/          # API endpoint definitions
├── controllers/     # Request handlers
├── services/       # Business logic
├── middleware/     # Express middleware
├── utils/          # Helper functions
├── validators/     # Input validation (Zod)
└── config/         # Configuration management
```

### 3. Microservices

#### User Service
- User registration and authentication
- Profile management
- Two-factor authentication
- OAuth integration (Google, Apple)

#### Learning Service
- Course management
- Module delivery
- Quiz handling
- Progress tracking
- Certificate generation

#### Financial Service
- Expense tracking
- Budget management
- Goal management
- Calculator logic
- Analytics computation

#### AI Service
- LLM integration
- Chat functionality
- Receipt OCR processing
- Expense categorization
- Personalized recommendations
- Learning path generation

#### Community Service
- Forum management
- Discussion threads
- Comments and reactions
- Moderation tools

#### Admin Service
- User management
- Content management
- Analytics and reporting
- System configuration

### 4. Data Layer

#### PostgreSQL Database
- Primary data store
- Relational data with Prisma ORM
- Transactional integrity
- Backup and recovery

**Key Tables**:
- `users` - User accounts and profiles
- `courses` - Learning modules and content
- `lessons` - Individual lesson details
- `expenses` - User expense entries
- `budgets` - Budget definitions
- `goals` - Financial goals
- `transactions` - All financial transactions
- `forum_posts` - Community discussions
- `achievements` - Gamification badges and streaks
- `ai_conversations` - Chat history
- `audit_logs` - System audit trail

#### Redis Cache
- Session management
- Real-time notifications
- Rate limiting
- Leaderboard data
- Temporary data storage

#### Cloud Storage (S3/Supabase)
- User-uploaded files (receipts, documents)
- Video content
- Images and avatars
- Backups

### 5. AI Integration Layer

**LLM Provider Options**:
- OpenAI GPT-4
- Anthropic Claude
- Google Gemini

**Capabilities**:
- Educational chatbot
- Content generation
- Expense categorization
- Receipt analysis via OCR
- Personalized recommendations
- Anomaly detection

**Safety Measures**:
- Clear educational disclaimers
- No financial advice generation
- Fact-checking mechanisms
- Regular model audits

## Authentication & Authorization

### Authentication Flow

1. **Email/Password**
   - Register → Verify Email → Login
   - JWT token issued on successful login
   - Refresh token stored in secure HTTP-only cookie

2. **OAuth (Google, Apple)**
   - Redirect to provider
   - Callback with authorization code
   - User created/linked automatically

3. **2FA (Optional)**
   - TOTP-based two-factor authentication
   - SMS as backup (future)

### Authorization

Role-based access control (RBAC):
- **User** - Access own data
- **Admin** - Full platform access
- **Moderator** - Community management
- **Content Creator** - Create courses/articles
- **Support** - User support tools

## Data Flow Examples

### Expense Tracking Flow

```
1. User uploads receipt
   ↓
2. Frontend sends file to backend
   ↓
3. Backend stores file in S3
   ↓
4. AI Service processes OCR → Extracts data
   ↓
5. AI categorizes expense
   ↓
6. Backend saves to database
   ↓
7. Real-time update via Socket.io
   ↓
8. Dashboard reflects new expense
```

### AI Chat Flow

```
1. User sends message
   ↓
2. Frontend sends to backend
   ↓
3. Backend stores in chat history
   ↓
4. AI Service processes with context
   ↓
5. LLM generates educational response
   ↓
6. Backend applies safety filters
   ↓
7. Response streamed to frontend
   ↓
8. Real-time display in chat UI
```

## Scalability Considerations

### Horizontal Scaling
- Stateless backend services
- Load balancing across instances
- Database connection pooling
- Redis for distributed caching

### Database Optimization
- Indexed queries
- Materialized views for analytics
- Read replicas for reporting
- Partitioning for large tables

### Caching Strategy
- Application-level caching (Redis)
- CDN for static assets
- Browser caching headers
- API response caching

### Monitoring & Observability
- Sentry for error tracking
- LogRocket for frontend monitoring
- Application Performance Monitoring (APM)
- Custom dashboards in Datadog/New Relic

## Security Architecture

### Network Security
- SSL/TLS encryption
- VPC isolation
- Rate limiting
- DDoS protection (Cloudflare)

### Application Security
- Input validation (Zod)
- SQL injection prevention (Prisma ORM)
- XSS protection (CSP headers)
- CSRF tokens
- Secure session management

### Data Security
- Encryption at rest
- Encryption in transit
- PII handling best practices
- GDPR compliance
- Regular penetration testing

## Deployment Architecture

### Environments
- **Development** - Local Docker Compose
- **Staging** - Pre-production testing
- **Production** - Highly available setup

### Infrastructure
- Frontend: Vercel (auto-scaling, CDN)
- Backend: Railway/Render/AWS (containerized)
- Database: AWS RDS (Multi-AZ)
- Cache: ElastiCache/Redis Cloud
- Storage: AWS S3 with CloudFront CDN

### CI/CD Pipeline
- GitHub Actions for automation
- Automated testing on PR
- Docker image building
- Deployment to staging
- Manual promotion to production

## Future Considerations

### Event-Driven Architecture
- Message queues (RabbitMQ, Apache Kafka)
- Event sourcing for audit trails
- Asynchronous job processing

### Microservices Expansion
- Service mesh (Istio)
- API versioning strategy
- Service discovery
- Distributed tracing

### Advanced Features
- Machine learning pipeline
- Real-time financial data feeds
- Blockchain integration (if needed)
- IoT integration (future)

## References

- [12 Factor App Methodology](https://12factor.net/)
- [Clean Architecture](https://blog.cleancoder.com/)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)