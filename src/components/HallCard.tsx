import type { Hall } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { Users } from 'lucide-react';

export default function HallCard({ hall }: { hall: Hall }) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
            <Image 
              src={hall.image} 
              alt={`View of ${hall.name}`} 
              fill 
              className="object-cover"
              data-ai-hint={hall.aiHint}
            />
        </div>
        <div className="p-6 pb-0">
            <CardTitle className="font-headline text-2xl">{hall.name}</CardTitle>
            <CardDescription className="mt-2 h-10 text-muted-foreground">{hall.description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow p-6">
        <div className="flex items-center text-muted-foreground mb-4">
          <Users className="h-5 w-5 mr-2" />
          <span>Up to {hall.capacity} guests</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {hall.amenities.map(amenity => (
            <Badge key={amenity.name} variant="secondary" className="flex items-center gap-1.5 py-1 px-2.5">
              <amenity.icon className="h-3.5 w-3.5 text-primary" />
              {amenity.name}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="bg-muted/30 p-6 flex justify-between items-center">
        <p className="text-xl font-semibold text-primary">
          RM{hall.pricing.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground"> / day</span>
        </p>
        <Button asChild>
          <Link href={`/booking?hallId=${hall.id}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
