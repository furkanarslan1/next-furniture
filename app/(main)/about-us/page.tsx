import {
  Award,
  HeartHandshake,
  Leaf,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";
import { Metadata } from "next";
import AboutStats from "./_components/AboutStats";

export const metadata: Metadata = {
  title: "Why Next Furniture",
  description:
    "Discover why thousands of customers trust Next Furniture. Quality craftsmanship, sustainable materials, and exceptional customer service.",
  alternates: {
    canonical: "/about-us",
  },
};

const values = [
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Every piece is crafted from carefully selected, high-grade materials. We partner with skilled artisans who share our commitment to excellence and attention to detail.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "We source eco-friendly and responsibly harvested materials. Our furniture is built to last for generations, reducing waste and environmental impact.",
  },
  {
    icon: Truck,
    title: "Free Delivery & Assembly",
    description:
      "Enjoy complimentary delivery and professional assembly on all orders. Our team ensures your furniture arrives safely and is set up perfectly in your home.",
  },
  {
    icon: ShieldCheck,
    title: "5-Year Warranty",
    description:
      "We stand behind every product with a comprehensive 5-year warranty. If anything goes wrong, our support team will make it right — no questions asked.",
  },
  {
    icon: HeartHandshake,
    title: "Customer-First Approach",
    description:
      "From browsing to after-sale support, your satisfaction is our priority. Our design consultants are available to help you find the perfect fit for your space.",
  },
  {
    icon: Users,
    title: "10,000+ Happy Customers",
    description:
      "Join a growing community of homeowners who trust Next Furniture. Our 4.9-star rating reflects our dedication to quality and service.",
  },
];

const stats = [
  { value: "10K+", label: "Happy Customers" },
  { value: "2,500+", label: "Products Delivered" },
  { value: "4.9", label: "Average Rating" },
  { value: "5 Years", label: "Warranty" },
];

export default function WhyNextFurniturePage() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Why Next Furniture?</h1>
        <p className="text-muted-foreground text-lg">
          We believe your home deserves furniture that combines modern design,
          lasting quality, and honest pricing. Here is what sets us apart.
        </p>
      </div>

      {/* Stats */}
      {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="text-center p-6 rounded-xl border shadow-sm"
          >
            <p className="text-3xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div> */}
      <AboutStats />

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="p-6 rounded-xl border shadow-sm space-y-3"
            >
              <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center">
                <Icon className="h-5 w-5 text-amber-600" />
              </div>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="text-center rounded-xl bg-gray-100 p-10 space-y-4">
        <h2 className="text-2xl font-bold">Ready to Transform Your Home?</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">
          Browse our collections and find the perfect furniture for every room.
          Quality you can see, comfort you can feel.
        </p>
        <a
          href="/"
          className="inline-block bg-amber-300 text-gray-900 font-semibold px-8 py-3 rounded-xl hover:bg-amber-400 transition-colors"
        >
          Explore Collections
        </a>
      </div>
    </div>
  );
}
