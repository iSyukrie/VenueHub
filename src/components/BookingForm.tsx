"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { halls } from '@/lib/data';
import type { BookingRequest } from '@/lib/types';
import { useSearchParams } from 'next/navigation';

const bookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  hallId: z.string({ required_error: "Please select a hall." }),
  date: z.date({
    required_error: "A date for the event is required.",
  }),
});

export default function BookingForm() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const defaultHallId = searchParams.get('hallId');
    const defaultDateStr = searchParams.get('date');
    const defaultDate = defaultDateStr ? new Date(defaultDateStr) : undefined;

    const form = useForm<z.infer<typeof bookingSchema>>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            name: '',
            email: '',
            phoneNumber: '',
            hallId: defaultHallId || undefined,
            date: defaultDate,
        },
    });

    function onSubmit(values: z.infer<typeof bookingSchema>) {
        const newBooking: BookingRequest = {
            id: crypto.randomUUID(),
            ...values,
            createdAt: new Date(),
        };

        try {
            const existingBookings: BookingRequest[] = JSON.parse(localStorage.getItem('bookings') || '[]').map((b: any) => ({...b, date: new Date(b.date)}));
            
            const isAlreadyBooked = existingBookings.some(booking => 
                booking.hallId === newBooking.hallId && booking.date.toDateString() === newBooking.date.toDateString()
            );

            if (isAlreadyBooked) {
                toast({
                    variant: "destructive",
                    title: "Booking Failed",
                    description: "This venue is already booked for the selected date.",
                });
                return;
            }
            
            localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));
            
            toast({
                title: "🎉 Booking Request Sent!",
                description: "We've received your request and will be in touch shortly to confirm.",
            });
            form.reset({ name: '', email: '', phoneNumber: '', hallId: undefined, date: undefined });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem saving your request. Please try again.",
            });
        }
    }

    return (
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Booking Request Details</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input type="tel" placeholder="012-345 6789" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="hallId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Venue</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a venue to book" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {halls.map((hall) => (
                                                <SelectItem key={hall.id} value={String(hall.id)}>
                                                    {hall.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Event Date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "w-full justify-start text-left font-normal",
                                                        !field.value && "text-muted-foreground"
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}
                                                disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Submit Request</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
