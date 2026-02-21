import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { QueryProvider } from '@/components/providers/query-provider';

export const metadata = {
  title: 'AgentX - AI Agent Marketplace',
  description: 'Create, sell & hire AI agents. The future of work is autonomous.',
  keywords: 'AI agents, marketplace, automation, artificial intelligence, SaaS',
  openGraph: {
    title: 'AgentX - AI Agent Marketplace',
    description: 'Create, sell & hire AI agents. Earn passive income from your AI creations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_live_Y2xlcmsuYWdlbnR4LmFpJA'}>
      <html lang="en">
        <body className="bg-gray-950 text-white antialiased">
          <QueryProvider>{children}</QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}