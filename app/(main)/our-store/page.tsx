import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Store",
  description:
    "Visit Next Furniture store. Find our location, working hours and contact information.",
  alternates: {
    canonical: "/our-store",
  },
};

export default function OurStorePage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Our Store</h1>
        <p className="text-muted-foreground">
          Visit us in person and explore our furniture collection. Our team is
          ready to help you find the perfect pieces for your home.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden border shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.238539498498!2d28.97693!3d41.03729!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7650656bd63%3A0x8ca058b28c20b6c3!2zVGFrc2ltIE1leWRhbsSx!5e0!3m2!1sen!2str!4v1700000000000!5m2!1sen!2str"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Next Furniture Store Location"
          />
        </div>

        {/* Store Info */}
        <div className="space-y-6">
          <div className="rounded-xl border shadow-sm p-6 space-y-5">
            <h2 className="text-xl font-semibold">Store Information</h2>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Address</p>
                <p className="text-sm text-muted-foreground">
                  Taksim Square, Beyoglu
                  <br />
                  Istanbul, Turkey
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Phone</p>
                <a
                  href="tel:+902121234567"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  +90 (212) 123 45 67
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Email</p>
                <a
                  href="mailto:info@nextfurniture.com"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  info@nextfurniture.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="font-medium">Working Hours</p>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>Mon - Fri: 09:00 - 19:00</p>
                  <p>Saturday: 10:00 - 18:00</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
