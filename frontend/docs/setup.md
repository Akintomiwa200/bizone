I'll create a comprehensive `setup.md` file for the Bizone project:

# `docs/setup.md`

```markdown
# Bizone - Setup Guide

## Project Overview

Bizone is a comprehensive business management platform for Nigerian MSMEs, providing digital storefronts, financial services, logistics, and business analytics in one integrated solution.

## Prerequisites

### System Requirements
- **Node.js**: 18.17 or later
- **Package Manager**: npm 9.x, yarn 1.22+, or pnpm
- **Git**: For version control
- **Operating System**: Windows, macOS, or Linux
- **RAM**: Minimum 4GB (8GB recommended)
- **Storage**: At least 2GB free space

### Required Software
1. **Node.js & npm**
   ```bash
   # Check if installed
   node --version
   npm --version
   ```

2. **Git**
   ```bash
   git --version
   ```

3. **Code Editor** (Recommended: VS Code)
   - Download from [code.visualstudio.com](https://code.visualstudio.com/)

### Recommended VS Code Extensions
```bash
# Install these extensions for better development experience
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension formulahendry.auto-rename-tag
```

## Installation Steps

### Step 1: Clone the Repository
```bash
# Clone the main repository
git clone https://github.com/your-organization/bizone.git

# Navigate to project directory
cd bizone

# Optional: Switch to development branch if needed
git checkout develop
```

### Step 2: Install Dependencies
```bash
# Using npm (recommended)
npm install

# Alternative: Using yarn
yarn install

# Alternative: Using pnpm
pnpm install
```

### Step 3: Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Application
NODE_ENV=development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-nextauth-key-here

# Database (Choose one option below)

# Option A: PostgreSQL (Recommended)
DATABASE_URL="postgresql://username:password@localhost:5432/bizone_dev"

# Option B: SQLite (Development only)
DATABASE_URL="file:./dev.db"

# Payment Integration - Paystack
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key

# WhatsApp Business API
WHATSAPP_BUSINESS_ID=your_whatsapp_business_id
WHATSAPP_ACCESS_TOKEN=your_whatsapp_access_token

# Logistics API - Sendy
SENDY_API_KEY=your_sendy_api_key
SENDY_BASE_URL=https://api.sendy.it

# File Upload - Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service - Resend
RESEND_API_KEY=re_your_resend_api_key

# Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

### Step 4: Database Setup

#### Option A: PostgreSQL (Recommended for Production)
1. **Install PostgreSQL**
   - **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/windows/)
   - **macOS**: `brew install postgresql`
   - **Linux**: `sudo apt install postgresql postgresql-contrib`

2. **Create Database**
   ```bash
   # Access PostgreSQL
   psql -U postgres

   # Create database
   CREATE DATABASE bizone_dev;

   # Create user (optional)
   CREATE USER bizone_user WITH PASSWORD 'secure_password';
   GRANT ALL PRIVILEGES ON DATABASE bizone_dev TO bizone_user;

   # Exit
   \q
   ```

#### Option B: SQLite (Development - No setup required)
- SQLite database will be created automatically

### Step 5: Database Migration & Seeding
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed with sample data
npx prisma db seed
```

### Step 6: Start Development Server
```bash
# Start development server
npm run dev

# Or with specific port
npm run dev -- -p 3001
```

The application will be available at: `http://localhost:3000`

## Project Structure

```
bizone/
├── app/                    # Next.js 14 app directory
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   └── signup/
│   ├── dashboard/         # Main dashboard
│   │   ├── business/
│   │   ├── products/
│   │   ├── orders/
│   │   └── analytics/
│   ├── api/               # API routes
│   │   ├── auth/
│   │   ├── products/
│   │   └── orders/
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Input.tsx
│   ├── layouts/          # Layout components
│   │   ├── DashboardLayout.tsx
│   │   └── AuthLayout.tsx
│   └── navigation/       # Navigation components
├── lib/                  # Utility libraries
│   ├── auth.ts          # Auth configuration
│   ├── db.ts            # Database utilities
│   ├── utils.ts         # Helper functions
│   └── validations.ts   # Form validations
├── prisma/              # Database schema
│   ├── schema.prisma    # Main schema file
│   └── seed.ts         # Database seed data
├── public/              # Static assets
│   ├── images/
│   └── icons/
├── types/               # TypeScript definitions
│   ├── next-auth.d.ts
│   └── api.ts
└── docs/               # Documentation
    ├── setup.md
    └── deployment.md
```

## First-Time Setup Verification

### 1. Check Application Loads
- Open `http://localhost:3000`
- You should see the Bizone landing page

### 2. Test Authentication
1. Navigate to `http://localhost:3000/auth/signup`
2. Create a new business account
3. Verify you can log in successfully

### 3. Verify Dashboard Access
1. After login, you should be redirected to `/dashboard`
2. Check if all navigation items load properly
3. Verify sample data is displayed

### 4. Test Core Features
- Create a test product
- Add a sample customer
- Create a test order

## Common Setup Issues & Solutions

### Issue: Port 3000 Already in Use
```bash
# Solution 1: Use different port
npm run dev -- -p 3001

# Solution 2: Kill process on port 3000
npx kill-port 3000

# Solution 3: Find and kill process
lsof -ti:3000 | xargs kill -9
```

### Issue: Database Connection Errors
```bash
# Check if PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL service
sudo systemctl start postgresql

# Verify connection string in .env.local
echo $DATABASE_URL
```

### Issue: Prisma Client Generation Failed
```bash
# Regenerate Prisma client
npx prisma generate

# Reset database (development only)
npx prisma db push --force-reset

# Clear Prisma cache
rm -rf node_modules/.prisma
rm -rf node_modules/@prisma
npm install
```

### Issue: Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check TypeScript errors
npm run type-check
```

### Issue: Environment Variables Not Loading
```bash
# Ensure file is named .env.local (not .env)
# Restart development server after adding variables
# Check variable names match code usage
```

## Development Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npm run db:push      # Push database schema
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler
npm run format       # Format code with Prettier

# Testing
npm run test         # Run unit tests
npm run test:e2e     # Run end-to-end tests
```

## Testing the Setup

### Run Basic Tests
```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Run unit tests
npm run test
```

### Manual Testing Checklist
- [ ] Application loads without errors
- [ ] User registration works
- [ ] Login/logout functions properly
- [ ] Dashboard pages load
- [ ] Navigation works correctly
- [ ] Sample data displays
- [ ] Forms can be submitted
- [ ] No console errors in browser

## Next Steps After Setup

1. **Explore the Dashboard**
   - Navigate through different sections
   - Test core functionalities

2. **Configure Business Settings**
   - Update business profile
   - Configure payment methods
   - Set up delivery zones

3. **Integrate External Services**
   - Set up Paystack for payments
   - Configure WhatsApp Business API
   - Connect logistics providers

4. **Customize for Your Business**
   - Add your products and services
   - Set up your branding
   - Configure business rules

## Getting Help

### Documentation
- [API Documentation](./api-integration.md)
- [Deployment Guide](./deployment.md)
- [Component Library](./components.md)

### Support Channels
- **GitHub Issues**: [github.com/your-org/bizone/issues](https://github.com/your-org/bizone/issues)
- **Discord Community**: [discord.gg/bizone](https://discord.gg/bizone)
- **Email Support**: support@bizone.ng
- **Developer Documentation**: [docs.bizone.ng](https://docs.bizone.ng)

### Troubleshooting Tips
1. Always check the browser console for errors
2. Verify all environment variables are set
3. Ensure database is running and accessible
4. Check network tab for API call failures
5. Restart development server after configuration changes

## Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `NODE_ENV` | Environment mode | No | `development` |
| `NEXTAUTH_URL` | Application URL | Yes | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | NextAuth secret key | Yes | - |
| `DATABASE_URL` | Database connection string | Yes | - |
| `PAYSTACK_PUBLIC_KEY` | Paystack public key | No | - |
| `PAYSTACK_SECRET_KEY` | Paystack secret key | No | - |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | No | - |
| `CLOUDINARY_API_KEY` | Cloudinary API key | No | - |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | No | - |

---

**Need help?** Contact our support team at support@bizone.ng or create an issue on GitHub.
```

This comprehensive setup guide includes:

1. **Clear prerequisites** with version requirements
2. **Step-by-step installation** with multiple options
3. **Environment configuration** with examples
4. **Database setup** for both PostgreSQL and SQLite
5. **Troubleshooting section** for common issues
6. **Verification steps** to ensure proper setup
7. **Development scripts** reference
8. **Support resources** for getting help

The guide is designed to get developers from zero to a running development environment quickly and efficiently.