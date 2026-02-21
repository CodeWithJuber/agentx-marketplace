import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Search, Filter, Star, Bot, ArrowRight } from 'lucide-react';

export default async function MarketplacePage() {
  const user = await currentUser();
  
  const categories = [
    'All', 'Writing', 'Coding', 'Design', 'Marketing', 
    'Productivity', 'Research', 'Customer Support', 'Finance'
  ];

  const agents = [
    {
      id: '1',
      name: 'Blog Writer Pro',
      description: 'AI-powered blog post generator. Creates SEO-optimized content in seconds.',
      category: 'Writing',
      price: 49,
      rating: 4.9,
      reviews: 128,
      sales: 542,
      author: 'Sarah Chen',
      image: '✍️',
    },
    {
      id: '2',
      name: 'Code Reviewer AI',
      description: 'Automated code reviews. Finds bugs, suggests improvements, enforces best practices.',
      category: 'Coding',
      price: 29,
      rating: 4.8,
      reviews: 89,
      sales: 324,
      author: 'DevMaster',
      image: '💻',
    },
    {
      id: '3',
      name: 'Social Media Manager',
      description: 'Auto-generates posts, schedules content, analyzes engagement across all platforms.',
      category: 'Marketing',
      price: 39,
      rating: 4.7,
      reviews: 156,
      sales: 678,
      author: 'MarketingGuru',
      image: '📱',
    },
    {
      id: '4',
      name: 'Email Assistant',
      description: 'Drafts professional emails, manages inbox, schedules follow-ups automatically.',
      category: 'Productivity',
      price: 19,
      rating: 4.6,
      reviews: 234,
      sales: 892,
      author: 'ProductivityPro',
      image: '📧',
    },
    {
      id: '5',
      name: 'Research Assistant',
      description: 'Summarizes papers, finds sources, generates citations. Your personal research team.',
      category: 'Research',
      price: 59,
      rating: 4.9,
      reviews: 67,
      sales: 198,
      author: 'AcademicAI',
      image: '🔬',
    },
    {
      id: '6',
      name: 'Logo Designer',
      description: 'Creates professional logos in minutes. Unlimited revisions, full ownership.',
      category: 'Design',
      price: 79,
      rating: 4.8,
      reviews: 445,
      sales: 1234,
      author: 'DesignWizard',
      image: '🎨',
    },
    {
      id: '7',
      name: 'Customer Support Bot',
      description: '24/7 customer support. Answers FAQs, routes tickets, learns from interactions.',
      category: 'Customer Support',
      price: 99,
      rating: 4.7,
      reviews: 112,
      sales: 445,
      author: 'SupportAI',
      image: '🎧',
    },
    {
      id: '8',
      name: 'Financial Analyst',
      description: 'Analyzes stocks, tracks portfolios, generates investment reports.',
      category: 'Finance',
      price: 149,
      rating: 4.9,
      reviews: 78,
      sales: 234,
      author: 'FinanceBot',
      image: '📊',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Discover <span className="gradient-text">AI Agents</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Browse thousands of AI agents created by our community. 
            Find the perfect agent to automate your work.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
              />
            </div>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-500 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {agents.map((agent) => (
            <Link
              key={agent.id}
              href={`/agent/${agent.id}`}
              className="group glass rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center text-3xl">
                    {agent.image}
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{agent.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-400 transition-colors">
                  {agent.name}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {agent.description}
                </p>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold">${agent.price}</div>
                    <div className="text-sm text-gray-500">one-time</div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-sm text-gray-400">{agent.sales} sales</div>
                    <div className="text-sm text-gray-500">by {agent.author}</div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-sm text-primary-400">{agent.category}</span>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="btn-secondary">
            Load More Agents
          </button>
        </div>
      </div>
    </div>
  );
}