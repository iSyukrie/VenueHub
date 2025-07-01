import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { halls } from '@/lib/data';
import HallCard from '@/components/HallCard';

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16">
        <h1 className="text-4xl md:text-6xl font-bold font-headline tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          VenueHub
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Find and book the perfect venue for your weddings, conferences, and parties.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/halls">Browse Halls</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold text-center font-headline text-primary">Featured Venues</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {halls.slice(0, 3).map((hall) => (
            <HallCard key={hall.id} hall={hall} />
          ))}
        </div>
      </section>
    </div>
  );
}
