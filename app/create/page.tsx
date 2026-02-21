import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Bot, DollarSign, Zap, Settings, Eye } from 'lucide-react';

export default async function CreateAgentPage() {
  const user = await currentUser();
  
  if (!user) {
    redirect('/sign-in');
  }

  const categories = [
    'Writing', 'Coding', 'Design', 'Marketing', 
    'Productivity', 'Research', 'Customer Support', 'Finance', 'Other'
  ];

  const capabilities = [
    { id: 'text-generation', label: 'Text Generation', icon: '✍️' },
    { id: 'code-assistance', label: 'Code Assistance', icon: '💻' },
    { id: 'data-analysis', label: 'Data Analysis', icon: '📊' },
    { id: 'image-generation', label: 'Image Generation', icon: '🎨' },
    { id: 'web-search', label: 'Web Search', icon: '🔍' },
    { id: 'api-integration', label: 'API Integration', icon: '🔌' },
    { id: 'file-processing', label: 'File Processing', icon: '📁' },
    { id: 'voice-interaction', label: 'Voice Interaction', icon: '🎤' },
  ];

  return (
    <div className="min-h-screen bg-gray-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/dashboard" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Create New Agent</h1>
            <p className="text-gray-400">Build an AI agent and start earning</p>
          </div>
        </div>

        <form className="space-y-8">
          {/* Basic Info */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-400" />
              </div>
              <h2 className="text-xl font-semibold">Basic Information</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Agent Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Content Writer Pro"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Describe what your agent does and how it helps users..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500 resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">This will be shown on the marketplace listing.</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-primary-500/50 transition-colors text-sm"
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-accent-500/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-accent-400" />
              </div>
              <h2 className="text-xl font-semibold">Capabilities</h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {capabilities.map((cap) => (
                <button
                  key={cap.id}
                  type="button"
                  className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary-500/50 transition-all text-left"
                >
                  <div className="text-2xl mb-2">{cap.icon}</div>
                  <div className="text-sm font-medium">{cap.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold">Pricing</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Price (USD) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <input
                    type="number"
                    placeholder="29"
                    className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Pricing Model *</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-primary-500">
                  <option value="one_time">One-time Purchase</option>
                  <option value="subscription">Monthly Subscription</option>
                  <option value="usage">Usage-based</option>
                </select>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">You keep:</span>
                <span className="text-green-400 font-semibold">85%</span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-gray-400">Platform fee:</span>
                <span className="text-gray-400">15%</span>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="glass rounded-2xl p-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                <Settings className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold">Advanced Settings</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500" />
                <span>Make this agent public on marketplace</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500" />
                <span>Allow users to customize the agent</span>
              </label>
              
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="w-5 h-5 rounded border-white/10 bg-white/5 text-primary-500" />
                <span>Enable API access for this agent</span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <button type="button" className="btn-secondary">
              <Eye className="w-5 h-5 inline mr-2" />
              Preview
            </button>
            <button type="button" className="px-6 py-3 bg-white/5 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              Save as Draft
            </button>
            <button type="submit" className="btn-primary">
              <Zap className="w-5 h-5 inline mr-2" />
              Publish Agent
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}