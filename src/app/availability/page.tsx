import AvailabilityCalendar from '@/components/AvailabilityCalendar';

export default function AvailabilityPage() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">Venue Availability</h1>
        <p className="text-muted-foreground mt-2">Select a date on the calendar to see which venues are available.</p>
      </div>
      <AvailabilityCalendar />
    </div>
  );
}
