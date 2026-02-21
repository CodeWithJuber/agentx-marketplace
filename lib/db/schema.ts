import { pgTable, uuid, varchar, text, timestamp, integer, boolean, jsonb, decimal } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  clerkId: varchar('clerk_id', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull(),
  name: varchar('name', { length: 255 }),
  avatar: text('avatar'),
  referralCode: varchar('referral_code', { length: 20 }).unique(),
  referredBy: uuid('referred_by'),
  balance: decimal('balance', { precision: 10, scale: 2 }).default('0'),
  totalEarnings: decimal('total_earnings', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const agents = pgTable('agents', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  category: varchar('category', { length: 100 }).notNull(),
  icon: varchar('icon', { length: 50 }).default('bot'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  priceType: varchar('price_type', { length: 20 }).default('one_time'),
  isPublished: boolean('is_published').default(false),
  config: jsonb('config').default({}),
  capabilities: jsonb('capabilities').default([]),
  rating: decimal('rating', { precision: 2, scale: 1 }).default('0'),
  reviewCount: integer('review_count').default(0),
  usageCount: integer('usage_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const purchases = pgTable('purchases', {
  id: uuid('id').primaryKey().defaultRandom(),
  buyerId: uuid('buyer_id').notNull(),
  agentId: uuid('agent_id').notNull(),
  sellerId: uuid('seller_id').notNull(),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  platformFee: decimal('platform_fee', { precision: 10, scale: 2 }).notNull(),
  sellerEarnings: decimal('seller_earnings', { precision: 10, scale: 2 }).notNull(),
  stripePaymentId: varchar('stripe_payment_id', { length: 255 }),
  status: varchar('status', { length: 50 }).default('completed'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const referrals = pgTable('referrals', {
  id: uuid('id').primaryKey().defaultRandom(),
  referrerId: uuid('referrer_id').notNull(),
  referredId: uuid('referred_id').notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  earnings: decimal('earnings', { precision: 10, scale: 2 }).default('0'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  agentId: uuid('agent_id').notNull(),
  userId: uuid('user_id').notNull(),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const conversations = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  agentId: uuid('agent_id').notNull(),
  messages: jsonb('messages').default([]),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});