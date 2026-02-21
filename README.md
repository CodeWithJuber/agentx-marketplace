# AgentX - AI Agent Marketplace

🚀 **Create, Sell & Hire AI Agents**

The #1 marketplace for AI agents. Build once, sell forever. Join 3,500+ creators earning passive income from their AI creations.

## 🌟 Features

- **Create AI Agents** - No-code builder for custom AI agents
- **Sell & Earn** - Keep 85% of every sale
- **Viral Referrals** - Earn 20% lifetime commission on referrals
- **Secure & Trusted** - Enterprise-grade security

## 🛠️ Tech Stack

- **Framework:** Next.js 15 + React 19
- **Styling:** Tailwind CSS
- **Auth:** Clerk
- **Database:** PostgreSQL (Neon) + Drizzle ORM
- **Payments:** Stripe
- **Animations:** Framer Motion

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon recommended)
- Stripe account
- Clerk account

### Environment Variables

Create a `.env.local` file:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Database
DATABASE_URL=postgresql://...
```

### Installation

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── dashboard/      # Dashboard pages
│   ├── marketplace/    # Marketplace page
│   ├── create/         # Agent creation page
│   └── ...
├── components/         # React components
├── lib/               # Utilities and configs
│   ├── db/           # Database schema and client
│   └── stripe.ts     # Stripe integration
├── public/            # Static assets
└── ...
```

## 💰 Revenue Model

| Plan | Price | Platform Fee | Features |
|------|-------|--------------|----------|
| Free | $0 | 15% | 3 agents, basic analytics |
| Pro | $29/mo | 10% | Unlimited agents, priority support |
| Enterprise | $99/mo | 5% | API access, white-label |

## 🎯 Viral Growth Strategy

1. **Referral Program** - 20% lifetime commission
2. **Network Effects** - More agents = more value
3. **Creator Incentives** - 85% revenue share
4. **Social Proof** - Public sales stats and reviews

## 📝 License

MIT License - feel free to use this for your own projects!

---

Built with 💜 for creators who want to monetize AI.

**[Live Demo](https://agentx.ai)** | **[Documentation](https://docs.agentx.ai)** | **[Support](mailto:support@agentx.ai)**