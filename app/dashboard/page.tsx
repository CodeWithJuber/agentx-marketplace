import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, Bot, DollarSign, Users, Settings, 
  TrendingUp, Plus, Star 
} from 'lucide-react';

export default async function DashboardPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Mock data - replace with real DB queries
  const stats = [
    { label: 'Total Earnings', value: '$12,450', change: '+23%', icon: DollarSign },
    { label: 'Active Agents', value: '8', change: '+2', icon: Bot },
    { label: 'Total Sales', value: '156', change: '+12%', icon: TrendingUp },
    { label: 'Referrals', value: '24', change: '+5', icon: Users },
  ];

  const myAgents = [
    { name: 'Content Writer Pro', category: 'Writing', price: '$49', sales: 45, rating: 4.8, status: 'published' },
    { name: 'Code Reviewer', category: 'Development', price: '$29', sales: 32, rating: 4.9, status: 'published' },
    { name: 'Email Assistant', category: 'Productivity', price: '$19', sales: 28, rating: 4.7, status: 'draft' },
  ];

  return (
    <div className="min-h-screen bg-gray-950">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-gray-900/50 border-r border-white/10 fixed left-0 top-0 pt-20">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <img 
                src={user.imageUrl} 
                alt={user.firstName || 'User'} 
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">{user.firstName} {user.lastName}</div>
                <div className="text-sm text-gray-400">Creator</div>
              </div>
            </div>
            
            <nav className="space-y-2">
              {[
                { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard', active: true },
                { icon: Bot, label: 'My Agents', href: '/dashboard/agents' },
                { icon: DollarSign, label: 'Earnings', href: '/dashboard/earnings' },
                { icon: Users, label: 'Referrals', href: '/dashboard/referrals' },
                { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-primary-500/20 text-primary-400' 
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8 pt-24">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-gray-400">Welcome back, {user.firstName}! Here's your performance overview.</p>
              </div>
              <Link href="/create" className="btn-primary">
                <Plus className="w-5 h-5 inline mr-2" />
                Create New Agent
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="glass rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-primary-400" />
                    <span className="text-sm text-green-400">{stat.change}</span>
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* My Agents */}
            <div className="glass rounded-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Agents</h2>
                <Link href="/dashboard/agents" className="text-primary-400 hover:text-primary-300">
                  View All →
                </Link>
              </div>
              
              <div className="divide-y divide-white/10">
                {myAgents.map((agent, index) => (
                  <div key={index} className="px-6 py-4 flex items-center justify-between hover:bg-white/5">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold">{agent.name}</div>
                        <div className="text-sm text-gray-400">{agent.category}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <div className="font-semibold">{agent.price}</div>
                        <div className="text-sm text-gray-400">Price</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="font-semibold">{agent.sales}</div>
                        <div className="text-sm text-gray-400">Sales</div>
                      </div>
                      
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-semibold">{agent.rating}</span>
                      </div>
                      
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        agent.status === 'published' 
                          ? 'bg-green-500/20 text-green-400' 
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {agent.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}