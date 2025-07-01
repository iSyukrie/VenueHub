"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { ContactInquiry } from '@/lib/types';

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }).max(500, { message: "Message must be less than 500 characters." }),
});

export default function ContactForm() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof contactSchema>>({
        resolver: zodResolver(contactSchema),
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    function onSubmit(values: z.infer<typeof contactSchema>) {
        const newInquiry: ContactInquiry = {
            id: crypto.randomUUID(),
            ...values,
            createdAt: new Date(),
        };

        try {
            const existingInquiries: ContactInquiry[] = JSON.parse(localStorage.getItem('inquiries') || '[]');
            localStorage.setItem('inquiries', JSON.stringify([...existingInquiries, newInquiry]));
            
            toast({
                title: "✅ Message Sent!",
                description: "Thank you for reaching out. We'll get back to you as soon as possible.",
            });
            form.reset();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem sending your message. Please try again.",
            });
        }
    }

    return (
        <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline">Send us a Message</CardTitle>
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
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="How can we help you today?" className="min-h-[120px]" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="lg">Send Message</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
