import { Wifi, Wind, ParkingCircle, Presentation, Projector, UtensilsCrossed } from 'lucide-react';
import type { Hall } from './types';

export const halls: Hall[] = [
  {
    id: 1,
    name: 'The Grand Ballroom',
    description: 'A magnificent space for grand weddings, conferences, and galas. Features high ceilings and crystal chandeliers.',
    capacity: 500,
    amenities: [
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Air Conditioning', icon: Wind },
      { name: 'Parking', icon: ParkingCircle },
      { name: 'Stage', icon: Presentation },
    ],
    pricing: 2500,
    image: 'https://placehold.co/600x400',
    aiHint: 'ballroom elegant',
  },
  {
    id: 2,
    name: 'The Oak Room',
    description: 'An intimate and warm setting perfect for business meetings, workshops, and private dinners.',
    capacity: 100,
    amenities: [
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Air Conditioning', icon: Wind },
      { name: 'Projector', icon: Projector },
    ],
    pricing: 800,
    image: 'https://placehold.co/600x400',
    aiHint: 'conference room',
  },
  {
    id: 3,
    name: 'The Skyline Terrace',
    description: 'A stunning rooftop venue with panoramic city views, ideal for cocktails, parties, and networking events.',
    capacity: 150,
    amenities: [
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Catering Available', icon: UtensilsCrossed },
    ],
    pricing: 1500,
    image: 'https://placehold.co/600x400',
    aiHint: 'rooftop terrace',
  },
  {
    id: 4,
    name: 'The Garden Pavilion',
    description: 'A beautiful glass pavilion surrounded by lush gardens, perfect for romantic weddings and outdoor events.',
    capacity: 200,
    amenities: [
      { name: 'Parking', icon: ParkingCircle },
      { name: 'Catering Available', icon: UtensilsCrossed },
    ],
    pricing: 1800,
    image: 'https://placehold.co/600x400',
    aiHint: 'garden wedding',
  },
    {
    id: 5,
    name: 'The Tech Hub',
    description: 'A modern, fully-equipped space for tech conferences, hackathons, and product launches.',
    capacity: 300,
    amenities: [
        { name: 'Wi-Fi', icon: Wifi },
        { name: 'Projector', icon: Projector },
        { name: 'Stage', icon: Presentation },
    ],
    pricing: 2200,
    image: 'https://placehold.co/600x400',
    aiHint: 'tech conference',
  },
  {
    id: 6,
    name: 'The Library Lounge',
    description: 'A cozy and sophisticated lounge for book signings, poetry readings, and intimate gatherings.',
    capacity: 50,
    amenities: [
      { name: 'Wi-Fi', icon: Wifi },
      { name: 'Air Conditioning', icon: Wind },
    ],
    pricing: 500,
    image: 'https://placehold.co/600x400',
    aiHint: 'cozy library',
  },
];
