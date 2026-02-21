import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
// Schema imports removed - used for reference only

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrate() {
  console.log('🔄 Running database migrations...');
  
  try {
    // Create tables
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        clerk_id VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL,
        name VARCHAR(255),
        avatar TEXT,
        referral_code VARCHAR(20) UNIQUE,
        referred_by UUID REFERENCES users(id),
        balance DECIMAL(10,2) DEFAULT 0,
        total_earnings DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS agents (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100) NOT NULL,
        icon VARCHAR(50) DEFAULT 'bot',
        price DECIMAL(10,2) NOT NULL,
        price_type VARCHAR(20) DEFAULT 'one_time',
        is_published BOOLEAN DEFAULT false,
        config JSONB DEFAULT '{}',
        capabilities JSONB DEFAULT '[]',
        rating DECIMAL(2,1) DEFAULT 0,
        review_count INTEGER DEFAULT 0,
        usage_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS purchases (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        buyer_id UUID NOT NULL REFERENCES users(id),
        agent_id UUID NOT NULL REFERENCES agents(id),
        seller_id UUID NOT NULL REFERENCES users(id),
        amount DECIMAL(10,2) NOT NULL,
        platform_fee DECIMAL(10,2) NOT NULL,
        seller_earnings DECIMAL(10,2) NOT NULL,
        stripe_payment_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'completed',
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS referrals (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        referrer_id UUID NOT NULL REFERENCES users(id),
        referred_id UUID NOT NULL REFERENCES users(id),
        status VARCHAR(50) DEFAULT 'pending',
        earnings DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        agent_id UUID NOT NULL REFERENCES agents(id),
        user_id UUID NOT NULL REFERENCES users(id),
        rating INTEGER NOT NULL,
        comment TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id),
        agent_id UUID NOT NULL REFERENCES agents(id),
        messages JSONB DEFAULT '[]',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;
    
    console.log('✅ Database migrations completed!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrate();