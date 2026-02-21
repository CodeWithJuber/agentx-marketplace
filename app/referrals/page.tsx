import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Copy, Gift, TrendingUp, Users, DollarSign } from 'lucide-react';

export default async function ReferralsPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  // Mock data
  const referralCode = 'AGENTX' + user.id.slice(0, 6).toUpperCase();
  const referralLink = `https://agentx.ai/?ref=${referralCode}`;
  
  const stats = {
    totalReferrals: 24,
    activeReferrals: 18,
    totalEarnings: 2840,
    pendingEarnings: 320,
  };

  const recentReferrals = [
    { name: 'Alex M.', date: '2 days ago', earnings: 45, status: 'active' },
    { name: 'Sarah K.', date: '5 days ago', earnings: 120, status: 'active' },
    { name: 'Mike R.', date: '1 week ago', earnings: 85, status: 'active' },
    { name: 'Emma W.', date: '2 weeks ago', earnings: 200, status: 'active' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent-500/10 border border-accent-500/20 mb-6">
            <Gift className="w-4 h-4 text-accent-400 mr-2" />
            <span className="text-accent-400 text-sm font-medium">🎁 Earn 20% Lifetime Commission</span>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">
            Refer <span className="gradient-text">& Earn</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Share AgentX with your friends and earn 20% of their earnings for life. 
            No limits. No catch. Just passive income.
          </p>
        </div>

        {/* Referral Link Card */}
        <div className="glass rounded-2xl p-8 mb-8">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-2">Your Referral Link</h2>
            <p className="text-gray-400">Share this link with friends to start earning</p>
          </div>
          
          <div className="flex max-w-2xl mx-auto">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-l-xl focus:outline-none"
            />
            <button className="px-6 py-3 bg-primary-600 hover:bg-primary-500 rounded-r-xl font-semibold transition-colors flex items-center">
              <Copy className="w-5 h-5 mr-2" />
              Copy
            </button>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            {['Twitter', 'LinkedIn', 'Email', 'WhatsApp'].map((platform) => (
              <button
                key={platform}
                className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-sm"
              >
                Share on {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-primary-400" />
            </div>
            <div className="text-3xl font-bold">{stats.totalReferrals}</div>
            <div className="text-gray-400">Total Referrals</div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold">{stats.activeReferrals}</div>
            <div className="text-gray-400">Active Users</div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-accent-400" />
            </div>
            <div className="text-3xl font-bold">${stats.totalEarnings}</div>
            <div className="text-gray-400">Total Earnings</div>
          </div>

          <div className="glass rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold">${stats.pendingEarnings}</div>
            <div className="text-gray-400">Pending</div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="glass rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-xl font-semibold">Recent Referrals</h2>
          </div>
          
          <div className="divide-y divide-white/10">
            {recentReferrals.map((referral, index) => (
              <div key={index} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                    {referral.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold">{referral.name}</div>
                    <div className="text-sm text-gray-400">Joined {referral.date}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="font-semibold text-green-400">+${referral.earnings}</div>
                    <div className="text-sm text-gray-400">Your earnings</div>
                  </div>
                  
                  <span className="px-3 py-1 rounded-full text-sm bg-green-500/20 text-green-400">
                    {referral.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">How Referrals Work</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Share Your Link',
                description: 'Share your unique referral link with friends, followers, or colleagues.',
              },
              {
                step: '2',
                title: 'They Sign Up',
                description: 'When someone signs up using your link, they become your referral.',
              },
              {
                step: '3',
                title: 'You Earn Forever',
                description: 'Earn 20% of all their earnings for life. No limits. No expiration.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}