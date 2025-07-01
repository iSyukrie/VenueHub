import type { LucideIcon } from 'lucide-react';

export interface Amenity {
  name: string;
  icon: LucideIcon;
}

export interface Hall {
  id: number;
  name: string;
  description: string;
  capacity: number;
  amenities: Amenity[];
  pricing: number; // per day
  image: string;
  aiHint: string;
}

export interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  hallId: string;
  date: Date;
  createdAt: Date;
}

export interface ContactInquiry {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
}
