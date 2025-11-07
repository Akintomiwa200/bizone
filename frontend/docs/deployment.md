I'll create a comprehensive `deployment.md` file for the Bizone project:

# `docs/deployment.md`

```markdown
# Bizone - Deployment Guide

## Overview

This guide covers deploying Bizone to various platforms including Vercel (recommended), AWS, Docker, and traditional servers.

## Pre-Deployment Checklist

### Prerequisites
- [ ] Application builds successfully: `npm run build`
- [ ] All tests pass: `npm run test`
- [ ] Environment variables configured
- [ ] Database is provisioned and accessible
- [ ] Domain name configured (for production)
- [ ] SSL certificates ready

### Production Readiness
- [ ] Remove console.log statements from production code
- [ ] Configure proper error handling
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies
- [ ] Security audit completed

## Deployment Options

### 1. Vercel (Recommended)

#### Advantages
- Zero configuration
- Automatic CI/CD
- Global CDN
- Serverless functions
- Free tier available

#### Deployment Steps

1. **Prepare Repository**
   ```bash
   # Ensure all changes are committed
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod

   # Or connect GitHub repo for auto-deploys
   ```

3. **Vercel Configuration** (`vercel.json`)
   ```json
   {
     "version": 2,
     "buildCommand": "npm run build",
     "outputDirectory": ".next",
     "installCommand": "npm install",
     "functions": {
       "app/api/**/*.ts": {
         "maxDuration": 30
       }
     },
     "env": {
       "NODE_ENV": "production"
     },
     "regions": ["fra1"]
   }
   ```

#### Environment Variables in Vercel
Add these in Vercel dashboard → Settings → Environment Variables:

```env
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
DATABASE_URL=your-production-database-url
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 2. AWS EC2 Deployment

#### Server Setup
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx -y

# Install PostgreSQL
sudo apt install postgresql postgresql-contrib -y
```

#### Application Deployment
```bash
# Clone repository
git clone https://github.com/your-organization/bizone.git
cd bizone

# Install dependencies
npm install --production

# Build application
npm run build

# Set environment variables
echo "NODE_ENV=production" >> .env
echo "NEXTAUTH_SECRET=your-secret" >> .env
echo "DATABASE_URL=your-db-url" >> .env

# Start with PM2
pm2 start npm --name "bizone" -- start
pm2 startup
pm2 save
```

#### Nginx Configuration
Create `/etc/nginx/sites-available/bizone`:
```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
    
    # Static assets caching
    location /_next/static/ {
        alias /home/ubuntu/bizone/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    location /public/ {
        alias /home/ubuntu/bizone/public/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/bizone /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 3. Docker Deployment

#### Dockerfile
```dockerfile
# Multi-stage build for optimized image size
FROM node:18-alpine AS base

# Install dependencies stage
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Build stage
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Build application
RUN npm run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Set permissions
RUN chown -R nextjs:nodejs /app/.next

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["npm", "start"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXTAUTH_SECRET=${NEXTAUTH_SECRET}
      - NEXTAUTH_URL=${NEXTAUTH_URL}
      - DATABASE_URL=${DATABASE_URL}
      - PAYSTACK_PUBLIC_KEY=${PAYSTACK_PUBLIC_KEY}
      - PAYSTACK_SECRET_KEY=${PAYSTACK_SECRET_KEY}
    depends_on:
      - database
    restart: unless-stopped
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.bizone.rule=Host(`your-domain.com`)"

  database:
    image: postgres:15
    environment:
      - POSTGRES_DB=bizone
      - POSTGRES_USER=bizone_user
      - POSTGRES_PASSWORD=${DATABASE_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: unless-stopped

volumes:
  postgres_data:
```

Build and run:
```bash
# Build image
docker build -t bizone .

# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

## Environment-Specific Configurations

### Production Environment
```env
NODE_ENV=production
NEXTAUTH_SECRET=very-long-random-secret-key-for-production
NEXTAUTH_URL=https://bizone.ng
DATABASE_URL=postgresql://user:password@production-db:5432/bizone
PAYSTACK_PUBLIC_KEY=pk_live_...
PAYSTACK_SECRET_KEY=sk_live_...
```

### Staging Environment
```env
NODE_ENV=development
NEXTAUTH_SECRET=staging-secret-key
NEXTAUTH_URL=https://staging.bizone.ng
DATABASE_URL=postgresql://user:password@staging-db:5432/bizone_staging
PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...
```

## Database Migrations

### Production Migrations
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed initial data (if needed)
npx prisma db seed

# Verify database connection
npx prisma db execute --file ./prisma/verify-connection.sql
```

### Backup Strategy
```bash
#!/bin/bash
# backup.sh
BACKUP_DIR="/backups/bizone"
DATE=$(date +%Y%m%d_%H%M%S)
DB_NAME="bizone"

# Create backup
pg_dump $DATABASE_URL > $BACKUP_DIR/backup_$DATE.sql

# Compress backup
gzip $BACKUP_DIR/backup_$DATE.sql

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://your-backup-bucket/

# Keep only last 7 backups
ls -t $BACKUP_DIR/backup_*.sql.gz | tail -n +8 | xargs rm -f

# Add to crontab for daily backups
# 0 2 * * * /path/to/backup.sh
```

## SSL Certificate Setup

### Using Let's Encrypt with Certbot
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal setup
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### SSL Configuration in Nginx
```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # SSL security settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # HSTS
    add_header Strict-Transport-Security "max-age=63072000" always;
}
```

## Performance Optimization

### Next.js Configuration
```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    domains: ['res.cloudinary.com', 'example.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // Enable gzip compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
  generateEtags: false,
}

module.exports = nextConfig
```

### CDN Configuration
1. **Cloudflare Setup**
   - Point DNS to Cloudflare nameservers
   - Enable Auto Minify
   - Configure Browser Cache TTL
   - Enable Brotli compression

2. **Image Optimization**
   - Use Cloudinary for image delivery
   - Implement lazy loading
   - Set proper cache headers

## Monitoring and Logging

### Application Monitoring
```bash
# Install monitoring tools
npm install @opentelemetry/api @opentelemetry/auto-instrumentations-node

# PM2 monitoring setup
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 30
```

### Error Tracking with Sentry
```javascript
// lib/sentry.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### Health Check Endpoint
```typescript
// app/api/health/route.ts
export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    return Response.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  } catch (error) {
    return Response.json(
      { status: 'unhealthy', error: error.message },
      { status: 503 }
    );
  }
}
```

## Security Configuration

### Security Headers
```javascript
// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}
```

### Rate Limiting
```typescript
// lib/rate-limit.ts
import { LRUCache } from 'lru-cache';

const rateLimit = ({
  interval,
  uniqueTokenPerInterval
}: {
  interval: number;
  uniqueTokenPerInterval: number;
}) => {
  const tokenCache = new LRUCache({
    max: uniqueTokenPerInterval,
    ttl: interval,
  });

  return {
    check: (limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = (tokenCache.get(token) as number[]) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;

        response.headers.set('X-RateLimit-Limit', `${limit}`);
        response.headers.set(
          'X-RateLimit-Remaining',
          isRateLimited ? '0' : `${limit - currentUsage}`
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
};

export default rateLimit;
```

## Deployment Automation

### GitHub Actions CI/CD
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test
      
    - name: Build application
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

## Rollback Procedures

### Vercel Rollback
1. Go to Vercel dashboard
2. Select your project
3. Click "Deployments"
4. Find the previous working deployment
5. Click "..." → "Promote to Production"

### Docker Rollback
```bash
# Revert to previous image version
docker-compose down
docker-compose pull
docker-compose up -d

# Or use specific tag
docker-compose up -d --force-recreate app
```

### Manual Rollback
```bash
# Revert git commit
git revert HEAD

# Rebuild and restart
npm run build
pm2 restart bizone
```

## Maintenance Tasks

### Regular Maintenance Schedule
```bash
#!/bin/bash
# maintenance.sh

# Weekly tasks
npm update              # Update dependencies
npx prisma db push     # Apply database migrations

# Monthly tasks
npm audit fix          # Security updates
pm2 reload all         # Restart applications

# Quarterly tasks
# Review and update infrastructure
# Performance optimization review
```

### Monitoring Setup
1. **Uptime Monitoring**: UptimeRobot or Pingdom
2. **Performance Monitoring**: New Relic or Datadog
3. **Error Tracking**: Sentry or Bugsnag
4. **Log Management**: LogRocket or Papertrail

## Troubleshooting Common Deployment Issues

### Application Won't Start
```bash
# Check logs
pm2 logs bizone
docker-compose logs app

# Verify environment variables
echo $NODE_ENV
echo $DATABASE_URL

# Check port availability
netstat -tulpn | grep :3000
```

### Database Connection Issues
```bash
# Test database connection
npx prisma db execute --stdin --url $DATABASE_URL <<< "SELECT 1;"

# Check database status
sudo systemctl status postgresql

# Verify connection string
echo $DATABASE_URL
```

### Build Failures
```bash
# Clear caches
rm -rf .next
rm -rf node_modules/.cache

# Check memory usage
free -h

# Increase memory for build
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

## Cost Optimization

### Vercel Pricing
- Hobby plan: Free for personal projects
- Pro plan: $20/month for commercial use
- Enterprise: Custom pricing

### AWS Cost Saving Tips
- Use Spot Instances for non-critical workloads
- Implement auto-scaling
- Use CloudFront for static assets
- Monitor with Cost Explorer

## Support and Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [AWS EC2 Documentation](https://aws.amazon.com/ec2/)
- [Docker Documentation](https://docs.docker.com/)
- [Bizone Support](mailto:support@bizone.ng)

---

**Need Help?** Contact our deployment team at infra@bizone.ng or create an issue in our GitHub repository.
```

This comprehensive deployment guide covers:

1. **Multiple deployment options** (Vercel, AWS, Docker)
2. **Step-by-step instructions** for each platform
3. **Production-ready configurations**
4. **Security best practices**
5. **Monitoring and logging setup**
6. **Performance optimization**
7. **Troubleshooting guides**
8. **Cost optimization tips**
9. **Automated deployment workflows**
10. **Rollback procedures**

The guide ensures your Bizone application can be deployed reliably and securely to any environment.