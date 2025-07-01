import HallCard from '@/components/HallCard';
import { halls } from '@/lib/data';

export default function HallsPage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold font-headline text-center mb-2 text-primary">Our Venues</h1>
      <p className="text-center text-muted-foreground mb-8">Explore our collection of versatile spaces perfect for any occasion.</p>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {halls.map((hall) => (
          <HallCard key={hall.id} hall={hall} />
        ))}
      </div>
    </div>
  );
}
