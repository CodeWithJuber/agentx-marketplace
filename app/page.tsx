import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-950">
      <Navbar />
      <Hero />
    </main>
  );
}