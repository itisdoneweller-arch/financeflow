# Deployment Guide - FinanceFlow

## Prerequisites

- Docker and Docker Compose
- Node.js 18+
- PostgreSQL 14+
- Redis 6+
- Git

## Local Development

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# Install dependencies
cd frontend && npm install
cd ../backend && npm install

# Setup environment files
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

Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Prisma Studio: http://localhost:5555

## Staging Deployment

### Using Railway or Render

1. **Create PostgreSQL Database**
   ```bash
   # Create a new PostgreSQL database
   # Set DATABASE_URL environment variable
   ```

2. **Deploy Backend**
   ```bash
   # Set environment variables
   RAILWAY_VARIABLES:
   - DATABASE_URL=postgresql://...
   - REDIS_URL=redis://...
   - NODE_ENV=staging
   - JWT_SECRET=your-secret
   - OPENAI_API_KEY=your-key
   
   # Deploy via Railway CLI
   railway up
   ```

3. **Deploy Frontend (Vercel)**
   ```bash
   # Connect GitHub repository to Vercel
   # Set NEXT_PUBLIC_API_URL=https://api-staging.financeflow.com
   # Auto-deploys on push to develop branch
   ```

## Production Deployment

### Infrastructure

**Frontend:**
- Host: Vercel
- CDN: Cloudflare
- Auto-deploy on main branch

**Backend:**
- Host: AWS ECS / Railway / Render
- Database: AWS RDS (PostgreSQL)
- Cache: ElastiCache (Redis)
- Storage: AWS S3

### Deployment Steps

1. **Prepare Production Environment**
   ```bash
   # Create .env.production file
   NODE_ENV=production
   DATABASE_URL=postgresql://prod_user:pwd@prod-db.region.rds.amazonaws.com:5432/financeflow
   REDIS_URL=redis://prod-cache.region.cache.amazonaws.com:6379
   JWT_SECRET=secure-production-secret
   ```

2. **Database Migration**
   ```bash
   npm run db:migrate -- --deployment
   ```

3. **Build & Deploy Backend**
   ```bash
   npm run build
   docker build -t financeflow-api:latest .
   docker push financeflow-api:latest
   
   # Update ECS task definition
   aws ecs update-service --cluster production --service financeflow-api --force-new-deployment
   ```

4. **Deploy Frontend**
   ```bash
   # Vercel auto-deploys from main branch
   git push origin main
   ```

### Post-Deployment

```bash
# Health checks
curl https://api.financeflow.com/health

# Monitor logs
aws logs tail /aws/ecs/financeflow-api --follow

# Run database checks
npm run db:seed  # (optional for production data)
```

## Database Backup

### Automated Backups

```bash
# AWS RDS - Enable automated backups
aws rds modify-db-instance \
  --db-instance-identifier financeflow-prod \
  --backup-retention-period 30 \
  --preferred-backup-window "03:00-04:00"
```

### Manual Backup

```bash
# Create snapshot
aws rds create-db-snapshot \
  --db-instance-identifier financeflow-prod \
  --db-snapshot-identifier financeflow-backup-$(date +%Y%m%d)
```

## Monitoring & Logging

### Sentry (Error Tracking)

```bash
# Configure in environment
SENTRY_DSN=https://key@sentry.io/project-id
```

### CloudWatch Logs

```bash
# View logs
aws logs tail /aws/ecs/financeflow-api --follow

# Create alarms
aws cloudwatch put-metric-alarm \
  --alarm-name financeflow-high-error-rate \
  --alarm-description "Alert on high error rate"
```

### Performance Monitoring

- New Relic / Datadog for APM
- CloudFront metrics for CDN
- RDS Performance Insights

## Rollback Procedure

```bash
# Rollback to previous version
aws ecs update-service \
  --cluster production \
  --service financeflow-api \
  --task-definition financeflow-api:previous-version

# Database rollback (if needed)
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier financeflow-prod-restored \
  --db-snapshot-identifier financeflow-backup-20260630
```

## Security Checklist

- [ ] All environment variables are set
- [ ] SSL/TLS certificates are valid
- [ ] Database encryption is enabled
- [ ] Regular security patches applied
- [ ] WAF rules configured on CloudFront
- [ ] Rate limiting enabled
- [ ] CORS properly configured
- [ ] Secrets not committed to repository

## Scaling

### Horizontal Scaling

```bash
# Update ECS service
aws ecs update-service \
  --cluster production \
  --service financeflow-api \
  --desired-count 5  # Increase replicas
```

### Database Connection Pooling

```bash
# Use PgBouncer or RDS Proxy
aws rds-proxy create-db-proxy \
  --db-proxy-name financeflow-pool \
  --engine-family POSTGRESQL
```

## Disaster Recovery

### RTO/RPO Targets
- RTO (Recovery Time Objective): 1 hour
- RPO (Recovery Point Objective): 15 minutes

### Multi-Region Failover

```bash
# Setup read replica in different region
aws rds create-db-instance-read-replica \
  --db-instance-identifier financeflow-prod-replica \
  --source-db-instance-identifier financeflow-prod \
  --availability-zone us-west-2a
```

## Cost Optimization

- Use spot instances for non-critical workloads
- Enable CloudFront caching
- Use database read replicas for analytics
- Set appropriate auto-scaling policies

## Support

For deployment issues:
- Check logs in CloudWatch
- Review Sentry error tracking
- Consult AWS documentation
- Contact DevOps team
