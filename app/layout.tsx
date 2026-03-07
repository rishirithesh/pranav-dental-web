import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Pranav's Dental Care | Creating Healthy & Beautiful Smiles",
  description: "High-trust, modern dental clinic in Velachery, Chennai led by Dr. Sudhakar Venkatachalapathy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
    "name": "Pranav's Dental Care",
    "image": "https://pranavsdentalcare.com/clinic.jpg",
    "@id": "https://pranavsdentalcare.com",
    "url": "https://pranavsdentalcare.com",
    "telephone": "+919841874253",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Velachery Main Rd, Ram Nagar, Ramnagar South, Dhadeswaram Nagar",
      "addressLocality": "Velachery, Chennai",
      "addressRegion": "Tamil Nadu",
      "postalCode": "600042",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 12.9787053,
      "longitude": 80.2183204
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "09:00",
      "closes": "21:00"
    }, {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Sunday",
      "opens": "09:00",
      "closes": "13:00"
    }],
    "medicalSpecialty": "Orthodontic"
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <meta name="theme-color" content="#2563EB" />
        <meta property="og:title" content="Pranav's Dental Care | Creating Healthy & Beautiful Smiles" />
        <meta property="og:description" content="High-trust, modern dental clinic in Velachery, Chennai led by Dr. Sudhakar Venkatachalapathy." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_IN" />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col pt-20`}>
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
