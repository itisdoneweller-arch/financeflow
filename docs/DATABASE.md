# Database Schema - FinanceFlow

## Overview

FinanceFlow uses PostgreSQL as its primary database with Prisma as the ORM. This document outlines the complete schema.

## Schema Design

### User Management

#### `User`
```prisma
model User {
  id                    String      @id @default(cuid())
  email                 String      @unique
  emailVerified         DateTime?
  name                  String?
  avatar                String?
  password              String?     // Null for OAuth users
  age                   Int?
  country               String?
  preferredLanguage     String      @default("en")
  occupation            String?
  studentStatus         String?     // "student", "not_student"
  incomeRange           String?     // "0-25k", "25-50k", etc.
  financialGoals        String[]    // Array of goal types
  experienceLevel       String      @default("beginner") // "beginner", "intermediate", "advanced"
  
  // Security & Auth
  twoFactorSecret       String?
  twoFactorEnabled      Boolean     @default(false)
  oauthAccounts         OAuthAccount[]
  sessions              Session[]
  refreshTokens         RefreshToken[]
  
  // Subscription & Status
  subscriptionTier      String      @default("free")
  subscriptionStatus    String      @default("active")
  stripeCustomerId      String?
  
  // Gamification
  xpPoints              Int         @default(0)
  currentStreak         Int         @default(0)
  longestStreak         Int         @default(0)
  lastActivityDate      DateTime?
  badges                Badge[]
  
  // Relationships
  expenses              Expense[]
  budgets               Budget[]
  goals                 Goal[]
  lessons               LessonProgress[]
  quizzes               QuizAttempt[]
  forumPosts            ForumPost[]
  forumComments         ForumComment[]
  aiConversations       AiConversation[]
  notifications         Notification[]
  achievements          Achievement[]
  
  // Admin & Audit
  role                  String      @default("user") // "user", "admin", "moderator", "creator"
  isActive              Boolean     @default(true)
  isBlocked             Boolean     @default(false)
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
  lastLoginAt           DateTime?
  
  @@index([email])
  @@index([role])
  @@index([createdAt])
}
```

#### `OAuthAccount`
```prisma
model OAuthAccount {
  id              String  @id @default(cuid())
  userId          String
  user            User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider        String  // "google", "apple", etc.
  providerUserId  String
  email           String?
  name            String?
  image           String?
  
  createdAt       DateTime @default(now())
  
  @@unique([provider, providerUserId])
  @@index([userId])
}
```

#### `Session` & `RefreshToken`
```prisma
model Session {
  id              String  @id @default(cuid())
  userId          String
  user            User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  token           String  @unique
  expiresAt       DateTime
  ipAddress       String?
  userAgent       String?
  
  createdAt       DateTime @default(now())
  
  @@index([userId])
  @@index([expiresAt])
}

model RefreshToken {
  id              String  @id @default(cuid())
  userId          String
  user            User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  token           String  @unique
  expiresAt       DateTime
  revokedAt       DateTime?
  
  createdAt       DateTime @default(now())
  
  @@index([userId])
  @@index([expiresAt])
}
```

### Learning & Content Management

#### `Course` & `Module`
```prisma
model Course {
  id                  String      @id @default(cuid())
  title               String
  description         String      @db.Text
  slug                String      @unique
  thumbnail           String?
  category            String      // "basics", "budgeting", "investing", etc.
  level               String      @default("beginner") // "beginner", "intermediate", "advanced"
  duration            Int         // minutes
  learningPath        String[]    // Array of applicable learning paths
  
  instructor          String?     // Instructor name
  instructorBio       String?
  instructorImage     String?
  
  modules             Module[]
  content             String      @db.Text
  keyTakeaways        String[]
  resources           String[]    // External resource links
  
  isPublished         Boolean     @default(false)
  isPremium           Boolean     @default(false)
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  publishedAt         DateTime?
  
  @@index([category])
  @@index([level])
  @@index([isPublished])
}

model Module {
  id                  String      @id @default(cuid())
  courseId            String
  course              Course      @relation(fields: [courseId], references: [id], onDelete: Cascade)
  
  title               String
  description         String      @db.Text
  order               Int
  estimatedMinutes    Int
  
  lessons             Lesson[]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@unique([courseId, order])
  @@index([courseId])
}

model Lesson {
  id                  String      @id @default(cuid())
  moduleId            String
  module              Module      @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  
  title               String
  description         String      @db.Text
  content             String      @db.Text
  order               Int
  videoUrl            String?
  estimatedMinutes    Int
  
  quiz                Quiz?
  progress            LessonProgress[]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@unique([moduleId, order])
  @@index([moduleId])
}
```

#### `Quiz` & `Quiz Questions`
```prisma
model Quiz {
  id                  String      @id @default(cuid())
  lessonId            String      @unique
  lesson              Lesson      @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  title               String
  passingScore        Int         @default(70)
  
  questions           QuizQuestion[]
  attempts            QuizAttempt[]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
}

model QuizQuestion {
  id                  String      @id @default(cuid())
  quizId              String
  quiz                Quiz        @relation(fields: [quizId], references: [id], onDelete: Cascade)
  
  question            String      @db.Text
  questionType        String      @default("multiple_choice") // "multiple_choice", "true_false", "short_answer"
  order               Int
  
  options             QuestionOption[]
  correctAnswer       String
  explanation         String      @db.Text
  
  createdAt           DateTime    @default(now())
  
  @@index([quizId])
}

model QuestionOption {
  id                  String      @id @default(cuid())
  questionId          String
  question            QuizQuestion @relation(fields: [questionId], references: [id], onDelete: Cascade)
  
  text                String
  order               Int
  
  @@index([questionId])
}

model QuizAttempt {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  quizId              String
  quiz                Quiz        @relation(fields: [quizId], references: [id], onDelete: Cascade)
  
  score               Int
  passed              Boolean
  answers             Json        // Stores user's answers
  
  completedAt         DateTime
  createdAt           DateTime    @default(now())
  
  @@index([userId])
  @@index([quizId])
  @@index([createdAt])
}

model LessonProgress {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  lessonId            String
  lesson              Lesson      @relation(fields: [lessonId], references: [id], onDelete: Cascade)
  
  completed           Boolean     @default(false)
  progress            Int         @default(0) // 0-100
  completedAt         DateTime?
  timeSpentSeconds    Int         @default(0)
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@unique([userId, lessonId])
  @@index([userId])
  @@index([completed])
}
```

### Financial Management

#### `Expense`
```prisma
model Expense {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  description         String
  amount              Decimal     @db.Decimal(10, 2)
  currency            String      @default("USD")
  
  category            String      // "food", "transport", "entertainment", etc.
  categoryConfidence  Float       @default(1.0) // AI confidence in categorization
  
  date                DateTime    // When the expense occurred
  receipt             String?     // URL to uploaded receipt
  receiptData         Json?       // Extracted data from receipt
  
  tags                String[]
  notes               String?
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@index([userId])
  @@index([date])
  @@index([category])
}

model Budget {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  category            String      // Budget category
  monthlyLimit        Decimal     @db.Decimal(10, 2)
  currency            String      @default("USD")
  
  period              String      @default("monthly") // "weekly", "monthly", "yearly"
  startDate           DateTime
  endDate             DateTime?
  
  isActive            Boolean     @default(true)
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@unique([userId, category, period])
  @@index([userId])
}

model Goal {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title               String
  description         String?
  type                String      // "savings", "investment", "debt_payoff", etc.
  
  targetAmount        Decimal     @db.Decimal(10, 2)
  currentAmount       Decimal     @db.Decimal(10, 2)  @default(0)
  currency            String      @default("USD")
  
  targetDate          DateTime
  progress            Int         // 0-100 percentage
  
  priority            String      @default("medium") // "low", "medium", "high"
  status              String      @default("active") // "active", "paused", "completed", "failed"
  
  category            String?
  icon                String?
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  completedAt         DateTime?
  
  @@index([userId])
  @@index([status])
  @@index([targetDate])
}
```

### Community & Engagement

#### `ForumPost` & `ForumComment`
```prisma
model ForumPost {
  id                  String      @id @default(cuid())
  authorId            String
  author              User        @relation(fields: [authorId], references: [id], onDelete: SetNull)
  
  title               String
  content             String      @db.Text
  category            String      // "general", "budgeting", "investing", "success_stories", etc.
  tags                String[]
  
  isPinned            Boolean     @default(false)
  isClosed            Boolean     @default(false)
  isSpam              Boolean     @default(false)
  
  viewCount           Int         @default(0)
  likeCount           Int         @default(0)
  commentCount        Int         @default(0)
  
  comments            ForumComment[]
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@index([category])
  @@index([createdAt])
  @@index([isPinned])
}

model ForumComment {
  id                  String      @id @default(cuid())
  postId              String
  post                ForumPost   @relation(fields: [postId], references: [id], onDelete: Cascade)
  
  authorId            String
  author              User        @relation(fields: [authorId], references: [id], onDelete: SetNull)
  
  content             String      @db.Text
  likeCount           Int         @default(0)
  
  isSpam              Boolean     @default(false)
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@index([postId])
  @@index([createdAt])
}
```

#### `AiConversation`
```prisma
model AiConversation {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  title               String
  messages            AiMessage[]
  
  context             Json?       // Stores context about user's situation
  lastMessageAt       DateTime?
  
  createdAt           DateTime    @default(now())
  updatedAt           DateTime    @updatedAt
  
  @@index([userId])
}

model AiMessage {
  id                  String      @id @default(cuid())
  conversationId      String
  conversation        AiConversation @relation(fields: [conversationId], references: [id], onDelete: Cascade)
  
  role                String      // "user", "assistant"
  content             String      @db.Text
  
  tokens              Int?
  model               String?     // Which LLM model was used
  
  createdAt           DateTime    @default(now())
  
  @@index([conversationId])
}
```

### Gamification

#### `Badge` & `Achievement`
```prisma
model Badge {
  id                  String      @id @default(cuid())
  title               String
  description         String
  icon                String      // URL to badge icon
  rarity              String      @default("common") // "common", "uncommon", "rare", "epic", "legendary"
  
  criteria            String      // Description of how to earn
  
  users               User[]
  
  createdAt           DateTime    @default(now())
  
  @@index([rarity])
}

model Achievement {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  badgeId             String
  badgeId             Badge       @relation(fields: [badgeId], references: [id])
  
  unlockedAt          DateTime    @default(now())
  
  @@unique([userId, badgeId])
  @@index([userId])
}
```

### Notifications & System

#### `Notification`
```prisma
model Notification {
  id                  String      @id @default(cuid())
  userId              String
  user                User        @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  type                String      // "bill_reminder", "goal_progress", "course_update", etc.
  title               String
  message             String      @db.Text
  
  relatedId           String?     // ID of related entity (course, goal, etc.)
  relatedType         String?     // Type of related entity
  
  isRead              Boolean     @default(false)
  
  createdAt           DateTime    @default(now())
  
  @@index([userId])
  @@index([isRead])
}
```

## Indexes

Key indexes for performance:
- User lookups: `email`, `id`
- Time-based queries: `createdAt`, `date`, `targetDate`
- Category filtering: `category`
- Status queries: `status`, `isPublished`, `isActive`
- User-specific data: `userId`

## Database Migrations

Migrations are managed by Prisma and stored in `backend/prisma/migrations/`.

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Apply migrations
npx prisma migrate deploy

# Reset database (dev only)
npx prisma migrate reset
```

## Seeding

Initial data (courses, badges, etc.) is seeded via `backend/prisma/seed.ts`.

```bash
npx prisma db seed
```

## Performance Optimization

- Connection pooling with PgBouncer
- Query optimization with EXPLAIN ANALYZE
- Regular VACUUM and ANALYZE
- Partitioning for large tables (expenses, transactions)
- Read replicas for analytics

## Backup Strategy

- Daily automated backups
- Point-in-time recovery (PITR) enabled
- Regular backup testing
- Offsite storage (AWS S3)

## References

- [Prisma Documentation](https://www.prisma.io/docs/)
- [PostgreSQL Best Practices](https://wiki.postgresql.org/wiki/Performance_Optimization)
- [Database Design Patterns](https://en.wikipedia.org/wiki/Database_design)