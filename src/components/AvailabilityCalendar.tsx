"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar } from '@/components/ui/calendar';
import type { BookingRequest } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { halls } from '@/lib/data';
import { format, isSameDay } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';


export default function AvailabilityCalendar() {
    const [bookings, setBookings] = useState<BookingRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    useEffect(() => {
        try {
            // Ensure date is parsed from string to Date object
            const storedBookings: BookingRequest[] = JSON.parse(localStorage.getItem('bookings') || '[]').map((booking: any) => ({
                ...booking,
                date: new Date(booking.date),
            }));
            setBookings(storedBookings);
        } catch (error) {
            console.error("Failed to parse bookings from localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const bookedDates = bookings.reduce((acc, booking) => {
        if (!acc.some(date => isSameDay(date, booking.date))) {
            acc.push(booking.date);
        }
        return acc;
    }, [] as Date[]);

    const getHallStatusForDate = (hallId: number, date: Date) => {
        const isBooked = bookings.some(booking =>
            String(booking.hallId) === String(hallId) && isSameDay(booking.date, date)
        );
        return isBooked ? 'Booked' : 'Available';
    };

    if (isLoading) {
        return (
            <div className="grid md:grid-cols-2 gap-8 items-start">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="flex justify-center p-6">
                        <Skeleton className="h-[280px] w-full max-w-[320px]" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                         <Skeleton className="h-6 w-1/2" />
                         <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="flex justify-between items-center p-3 rounded-lg border">
                               <Skeleton className="h-5 w-1/3" />
                               <Skeleton className="h-6 w-1/4 rounded-full" />
                           </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-8 items-start">
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="font-headline">Select a Date</CardTitle>
                    <CardDescription>Dates with any bookings are marked.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                        modifiers={{ booked: bookedDates }}
                        modifiersClassNames={{
                            booked: "text-destructive font-bold",
                        }}
                        className="p-0"
                        numberOfMonths={1}
                    />
                </CardContent>
            </Card>
            
            <Card className="shadow-lg">
                 <CardHeader>
                    <CardTitle className="font-headline">
                        Venue Status
                    </CardTitle>
                     <CardDescription>
                        Availability for {selectedDate ? format(selectedDate, "PPP") : 'the selected date'}.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                    {selectedDate ? (
                        halls.length > 0 ? halls.map(hall => {
                            const status = getHallStatusForDate(hall.id, selectedDate);
                            const isBooked = status === 'Booked';
                            return (
                                <div key={hall.id} className={cn("flex justify-between items-center p-3 rounded-lg border", {
                                    "bg-destructive/5 border-destructive/20": isBooked,
                                    "bg-secondary/50 border-border": !isBooked,
                                })}>
                                    <p className="font-semibold text-card-foreground">{hall.name}</p>
                                    {isBooked ? (
                                        <Badge variant="destructive">{status}</Badge>
                                    ) : (
                                        <Button asChild size="sm" className="px-3">
                                            <Link href={`/booking?hallId=${hall.id}&date=${selectedDate.toISOString()}`}>
                                                Book Now
                                            </Link>
                                        </Button>
                                    )}
                                </div>
                            );
                        }) : <p className="text-muted-foreground text-center py-4">No venues found.</p>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">Please select a date from the calendar to see venue availability.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
