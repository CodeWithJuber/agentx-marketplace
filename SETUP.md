# AgentX Environment Setup Guide

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/YOUR_USERNAME/agentx-marketplace.git
cd agentx-marketplace
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env.local` and fill in:

```bash
# Required for all features
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Required for payments
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Required for database
DATABASE_URL=postgresql://...

# Optional
CRON_SECRET=your_cron_secret
SLACK_WEBHOOK_URL=https://hooks.slack.com/...
```

### 3. Database Setup
```bash
# Run migrations
npm run db:migrate

# Or use the script
npx tsx scripts/migrate.ts
```

### 4. Development
```bash
npm run dev
```

### 5. Deploy
```bash
# Staging
./deploy.sh staging

# Production
./deploy.sh production
```

## CI/CD Secrets Required

Add these to your GitHub repository secrets:

| Secret | Description |
|--------|-------------|
| `VERCEL_TOKEN` | Vercel deployment token |
| `VERCEL_ORG_ID` | Your Vercel organization ID |
| `VERCEL_PROJECT_ID` | Your Vercel project ID |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk public key |
| `CLERK_SECRET_KEY` | Clerk secret key |
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `CRON_SECRET` | Secret for cron job auth |
| `SLACK_WEBHOOK_URL` | Slack notifications (optional) |

## Getting API Keys

### Clerk (Authentication)
1. Go to https://dashboard.clerk.com
2. Create a new application
3. Copy the publishable and secret keys

### Stripe (Payments)
1. Go to https://dashboard.stripe.com
2. Get your API keys from Developers → API keys
3. Create a webhook endpoint pointing to `/api/webhooks/stripe`
4. Copy the webhook signing secret

### Neon (Database)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string

## Production Checklist

- [ ] All environment variables set
- [ ] Database migrations run
- [ ] Stripe webhooks configured
- [ ] Domain configured (agentx.ai)
- [ ] SSL certificate active
- [ ] Analytics installed
- [ ] Error tracking (Sentry)
- [ ] Support email setup
- [ ] Terms of Service page
- [ ] Privacy Policy page