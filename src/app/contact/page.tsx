import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <div>
        <div className="text-center mb-8">
            <h1 className="text-4xl font-bold font-headline text-primary">Contact Us</h1>
            <p className="text-muted-foreground mt-2">Have a question or a special request? We'd love to hear from you.</p>
        </div>
      <ContactForm />
    </div>
  );
}
