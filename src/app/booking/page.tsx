import BookingForm from '@/components/BookingForm';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function BookingFormSkeleton() {
    return (
        <Card className="max-w-2xl mx-auto shadow-lg animate-pulse">
            <CardHeader>
                <Skeleton className="h-7 w-48" />
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <Skeleton className="h-11 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}

export default function BookingPage() {
  return (
    <div>
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline text-primary">Book a Venue</h1>
            <p className="text-muted-foreground mt-2">Fill out the form below to request a booking. We'll get back to you soon!</p>
        </div>
        <Suspense fallback={<BookingFormSkeleton />}>
            <BookingForm />
        </Suspense>
    </div>
  );
}
