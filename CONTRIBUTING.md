# Contributing to FinanceFlow

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors.

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Docker (optional but recommended)

### Initial Setup

```bash
# Clone repository
git clone https://github.com/itisdoneweller-arch/financeflow.git
cd financeflow

# Start services
docker-compose up -d

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup environment
cp backend/.env.example backend/.env.local
cp frontend/.env.example frontend/.env.local

# Initialize database
cd backend
npx prisma migrate dev
npx prisma db seed

# Start dev servers
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

## Branch Naming

```
feature/description          - New features
bugfix/description          - Bug fixes
docs/description            - Documentation
refactor/description        - Code refactoring
perf/description            - Performance improvements
test/description            - Tests
chore/description           - Maintenance
```

## Commit Messages

Use conventional commits:

```
type(scope): subject

detailed explanation of changes

Closes #issue-number
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvement
- `test`: Tests
- `chore`: Maintenance

**Example:**
```
feat(auth): add two-factor authentication

- Implement TOTP-based 2FA
- Add 2FA setup flow in settings
- Add 2FA verification on login

Closes #123
```

## Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make Changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Follow existing code style

3. **Run Quality Checks**
   ```bash
   # Backend
   cd backend
   npm run type-check
   npm run lint
   npm test
   
   # Frontend
   cd frontend
   npm run type-check
   npm run lint
   npm test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "type(scope): description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature
   ```

6. **PR Description Template**
   ```markdown
   ## Description
   Brief description of changes
   
   ## Related Issues
   Closes #123
   
   ## Type of Change
   - [ ] Bug fix
   - [ ] New feature
   - [ ] Breaking change
   - [ ] Documentation update
   
   ## How Has This Been Tested?
   Describe testing approach
   
   ## Screenshots (if applicable)
   
   ## Checklist
   - [ ] Code follows style guidelines
   - [ ] Self-review done
   - [ ] Comments added for complex logic
   - [ ] Documentation updated
   - [ ] Tests added/updated
   - [ ] All tests passing
   ```

## Code Style Guide

### General
- 2-space indentation
- Max line length: 100 characters
- Use meaningful variable names
- Add JSDoc comments for functions

### TypeScript
- Use explicit type annotations
- Avoid `any` type
- Use interfaces over types for object shapes
- Export types for public APIs

**Example:**
```typescript
/**
 * Calculates compound interest
 * @param principal - Initial investment amount
 * @param rate - Annual interest rate (decimal)
 * @param years - Number of years
 * @returns Final amount after interest
 */
function calculateInterest(
  principal: number,
  rate: number,
  years: number
): number {
  return principal * Math.pow(1 + rate, years);
}
```

### React
- Use functional components with hooks
- Keep components small and focused
- Use custom hooks for reusable logic
- Memoize expensive computations

**Example:**
```typescript
interface CardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, description, onClick }) => {
  return (
    <div className="p-4 border rounded" onClick={onClick}>
      <h3 className="font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
```

## Testing

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run specific test file
npm test -- auth.test.ts

# Watch mode
npm run test:watch

# Coverage report
npm run test:coverage
```

### Frontend Tests
```bash
cd frontend

# Run tests
npm test

# Watch mode
npm run test:watch

# Coverage
npm run test:coverage
```

### Test File Structure
```typescript
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    service = new AuthService();
  });

  afterEach(() => {
    // Cleanup
  });

  it('should register a new user', async () => {
    const result = await service.register(
      'test@example.com',
      'password123',
      'Test User'
    );
    expect(result.email).toBe('test@example.com');
  });
});
```

## Documentation

- Update README.md for significant changes
- Add JSDoc comments to functions
- Document API endpoints in docs/API.md
- Update CHANGELOG.md with notable changes

## Performance Guidelines

- Avoid N+1 queries (use eager loading with Prisma)
- Cache frequently accessed data in Redis
- Use database indexes for common queries
- Minimize bundle size on frontend
- Lazy load components when possible

## Security

- Never commit secrets or API keys
- Validate all user inputs
- Use parameterized queries (Prisma handles this)
- Sanitize data before storing
- Follow OWASP guidelines

## Getting Help

- Check existing issues and discussions
- Ask questions in GitHub Discussions
- Review documentation at docs.financeflow.com
- Join our community Slack channel

## Code Review Criteria

PRs are reviewed on:
- Code quality and readability
- Test coverage (aim for >80%)
- Performance impact
- Security considerations
- Documentation completeness
- Adherence to style guide

## Release Process

1. Update version in package.json
2. Update CHANGELOG.md
3. Create release PR
4. After merge, create GitHub Release
5. Auto-deploy to production

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to reach out:
- Open an issue for bugs
- Start a discussion for questions
- Email: dev@financeflow.com

Thank you for contributing! 🎉
