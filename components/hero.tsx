'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Bot, Sparkles, Zap, TrendingUp, Users, Shield, 
  ArrowRight, Star, CheckCircle, Play 
} from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'Create AI Agents',
    description: 'Build custom AI agents with no-code tools. Define capabilities, personality, and pricing.',
  },
  {
    icon: TrendingUp,
    title: 'Sell & Earn',
    description: 'Set your own prices. Keep 85% of every sale. Earn passive income while you sleep.',
  },
  {
    icon: Users,
    title: 'Viral Referrals',
    description: 'Earn 20% lifetime commission on every user you refer. Build your passive income empire.',
  },
  {
    icon: Shield,
    title: 'Secure & Trusted',
    description: 'Enterprise-grade security. All agents verified. Your data is always protected.',
  },
];

const stats = [
  { label: 'Active Agents', value: '12,000+' },
  { label: 'Creators', value: '3,500+' },
  { label: 'Total Sales', value: '$2.4M+' },
  { label: 'Happy Users', value: '50,000+' },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Indie Maker',
    content: 'I made $47,000 in my first month selling AI agents. The viral referral system is genius!',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Agency Owner',
    content: 'We hired 50+ AI agents for our clients. Saved us $200K in staffing costs.',
    avatar: 'MJ',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Content Creator',
    content: 'Created a viral TikTok agent. Now earning $5K/month passively. Life changing!',
    avatar: 'ER',
  },
];

export function Hero() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-gray-950 to-gray-950" />
        
        <div className="relative max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-8">
              <Sparkles className="w-4 h-4 text-accent-400 mr-2" />
              <span className="text-accent-400 text-sm font-medium">🚀 Launch Special: 0% Platform Fees for 30 Days</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Create <span className="gradient-text">AI Agents</span>.<br />
              Sell Them.<br />
              Get <span className="gradient-text">Rich</span>.
            </h1>

            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              The #1 marketplace for AI agents. Build once, sell forever. 
              Join 3,500+ creators earning passive income from their AI creations.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/sign-up" className="btn-primary text-lg px-8 py-4">
                <Zap className="w-5 h-5 inline mr-2" />
                Start Creating Free
              </Link>
              <Link href="/marketplace" className="btn-secondary text-lg px-8 py-4">
                <Play className="w-5 h-5 inline mr-2" />
                Explore Marketplace
              </Link>
            </div>

            {/* Email capture */}
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary-500"
                />
                <Link 
                  href={`/sign-up?email=${encodeURIComponent(email)}`}
                  className="btn-primary whitespace-nowrap"
                >
                  Get Early Access
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-2">Join 10,000+ on the waitlist. No spam, ever. 🔒</p>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to <span className="gradient-text">Succeed</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built for creators, by creators. Our platform gives you all the tools 
              to build, sell, and scale your AI agent business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="gradient-border p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Start Earning in <span className="gradient-text">3 Simple Steps</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Agent',
                description: 'Use our no-code builder to create an AI agent. Choose from templates or start from scratch.',
              },
              {
                step: '02',
                title: 'Set Your Price',
                description: 'You control pricing. One-time purchase, subscription, or usage-based. Keep 85% of revenue.',
              },
              {
                step: '03',
                title: 'Get Paid',
                description: 'We handle hosting, payments, and delivery. You focus on creating amazing agents.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-gray-800 mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
                {index < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-4 w-8 h-8 text-gray-600" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="gradient-text">Creators</span> Worldwide
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h2>
            <p className="text-gray-400">Start free. Scale as you grow.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Creator',
                price: '$0',
                description: 'Perfect for getting started',
                features: ['Create up to 3 agents', '15% platform fee', 'Basic analytics', 'Community support'],
              },
              {
                name: 'Pro',
                price: '$29',
                period: '/month',
                description: 'For serious creators',
                features: ['Unlimited agents', '10% platform fee', 'Advanced analytics', 'Priority support', 'Custom branding'],
                popular: true,
              },
              {
                name: 'Enterprise',
                price: '$99',
                period: '/month',
                description: 'For agencies & teams',
                features: ['Everything in Pro', '5% platform fee', 'API access', 'White-label option', 'Dedicated account manager'],
              },
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`rounded-2xl p-8 ${plan.popular ? 'bg-gradient-to-b from-primary-900/50 to-accent-900/50 border-2 border-primary-500' : 'glass'}`}
              >
                {plan.popular && (
                  <div className="inline-block px-3 py-1 rounded-full bg-primary-500 text-white text-sm font-medium mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-400">{plan.period}</span>}
                </div>
                <p className="text-gray-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-primary-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href="/sign-up"
                  className={`block text-center py-3 rounded-lg font-semibold transition-colors ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  Get Started
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Ready to Build Your <span className="gradient-text">AI Empire</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of creators already earning passive income from AI agents. 
              Your first agent could be live in minutes.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="btn-primary text-lg px-8 py-4">
                <Zap className="w-5 h-5 inline mr-2" />
                Start Creating Free
              </Link>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              No credit card required. Cancel anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold gradient-text">AgentX</span>
              </div>
              <p className="text-gray-400 text-sm">
                The #1 marketplace for AI agents. Create, sell, and hire autonomous AI workers.
              </p>
            </div>
            
            {[
              {
                title: 'Product',
                links: ['Marketplace', 'Create Agent', 'Pricing', 'API'],
              },
              {
                title: 'Company',
                links: ['About', 'Blog', 'Careers', 'Press'],
              },
              {
                title: 'Legal',
                links: ['Privacy', 'Terms', 'Cookie Policy'],
              },
            ].map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold mb-4">{section.title}</h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <Link href={`/${link.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-white text-sm">
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
            © 2026 AgentX. All rights reserved. Made with 💜 for creators.
          </div>
        </div>
      </footer>
    </div>
  );
}