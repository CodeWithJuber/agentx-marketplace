import './globals.css';
import { ClerkProvider } from '@/components/mock-clerk';
import { QueryProvider } from '@/components/providers/query-provider';

export const metadata = {
  title: 'AgentX - AI Agent Marketplace',
  description: 'Create, sell & hire AI agents. The future of work is autonomous.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-white antialiased">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}