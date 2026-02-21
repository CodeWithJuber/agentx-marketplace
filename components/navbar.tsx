'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { Bot, Sparkles, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">AgentX</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/marketplace" className="text-gray-300 hover:text-white transition-colors">
              Marketplace
            </Link>
            <Link href="/create" className="text-gray-300 hover:text-white transition-colors">
              Create Agent
            </Link>
            <Link href="/earnings" className="text-gray-300 hover:text-white transition-colors">
              Earnings
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <Link href="/sign-in" className="btn-secondary hidden sm:block">
                Sign In
              </Link>
              <Link href="/sign-up" className="btn-primary">
                <Sparkles className="w-4 h-4 inline mr-2" />
                Get Started
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard" className="btn-primary hidden sm:block">
                Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-4">
              <Link href="/marketplace" className="text-gray-300 hover:text-white">
                Marketplace
              </Link>
              <Link href="/create" className="text-gray-300 hover:text-white">
                Create Agent
              </Link>
              <Link href="/earnings" className="text-gray-300 hover:text-white">
                Earnings
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}