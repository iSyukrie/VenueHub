"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/halls', label: 'Halls' },
    { href: '/availability', label: 'Availability' },
    { href: '/booking', label: 'Book a Venue' },
    { href: '/contact', label: 'Contact' },
];

export default function Header() {
    const pathname = usePathname();
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
        navLinks.map((link) => (
            <Link
                key={link.href}
                href={link.href}
                onClick={() => inSheet && setIsSheetOpen(false)}
                className={cn(
                    "transition-colors hover:text-primary",
                    pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground",
                    inSheet && "text-lg py-2"
                )}
            >
                {link.label}
            </Link>
        ))
    );

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    <span className="font-bold font-headline">VenueHub</span>
                </Link>

                <nav className="hidden flex-1 items-center space-x-6 text-sm font-medium md:flex">
                    <NavLinks />
                </nav>

                <div className="flex flex-1 items-center justify-end space-x-4 md:hidden">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <div className="flex flex-col space-y-4 p-4">
                                <Link href="/" className="mb-4 flex items-center space-x-2" onClick={() => setIsSheetOpen(false)}>
                                    <Building2 className="h-6 w-6 text-primary" />
                                    <span className="font-bold font-headline">VenueHub</span>
                                </Link>
                                <nav className="flex flex-col space-y-2">
                                    <NavLinks inSheet={true} />
                                </nav>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
