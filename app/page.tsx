'use client';

import Hero from '@/components/hero';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle2, Star, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    { title: "Expert Orthodontist", desc: "Led by Dr. Sudhakar, a specialist in creating perfect smiles." },
    { title: "Advanced Technology", desc: "Equipped with state-of-the-art dental care equipment." },
    { title: "Painless Treatments", desc: "Prioritizing your comfort with modern techniques." },
    { title: "Affordable Care", desc: "Premium treatments without the premium price tag." }
  ];

  const services = [
    { title: "Braces & Aligners", icon: "🦷", desc: "Correct misaligned teeth for a perfect, confident smile with traditional or invisible solutions." },
    { title: "Dental Implants", icon: "💎", desc: "Permanent, natural-looking tooth replacements that restore both function and aesthetics." },
    { title: "Root Canal", icon: "⚡", desc: "Painless treatment to save infected teeth and eliminate severe dental pain instantly." },
    { title: "Cosmetic Dentistry", icon: "✨", desc: "Enhance your smile with veneers, bonding, and aesthetic contouring." }
  ];

  return (
    <>
      <Hero />

      {/* About Preview Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
                <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gradient-to-br from-blue-50 to-gray-100">
                  <svg className="w-16 h-16 mb-4 text-primary/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <span>Dr. Sudhakar Photo</span>
                </div>
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 hidden md:flex">
                <div className="bg-amber-100 p-3 rounded-full text-amber-600">
                  <Star className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <p className="font-bold text-xl text-gray-900 leading-none">15+</p>
                  <p className="text-sm font-medium text-gray-500 mt-1">Years Experience</p>
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <p className="text-primary font-bold tracking-wide uppercase text-sm">Welcome to Pranav&apos;s Dental Care</p>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">Your Smile is Our Greatest Priority.</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Led by <strong>Dr. Sudhakar Venkatachalapathy (Orthodontist)</strong>, our clinic in Velachery is dedicated to providing comprehensive, personalized dental care.
                We believe that every patient deserves a healthy, beautiful smile in a comfortable and stress-free environment.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                {features.map((feature, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                    <div>
                      <h4 className="font-bold text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/about" className="inline-block mt-4">
                <Button variant="outline" className="rounded-full shadow-sm hover:bg-gray-50 hover:text-primary transition-all border-2">
                  Learn More About Us <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-primary font-bold tracking-wide uppercase text-sm">What We Offer</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Comprehensive Dental Services</h2>
            <p className="text-gray-600 text-lg">From routine check-ups to advanced orthodontic treatments, we offer everything you need for optimal oral health.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="border-none shadow-md hover:shadow-xl transition-shadow duration-300 group bg-white">
                <CardContent className="p-8">
                  <div className="text-4xl mb-6 bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-6 line-clamp-3">{service.desc}</p>
                  <Link href={`/services#${service.title.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-')}`} className="text-primary font-bold flex items-center text-sm group-hover:translate-x-1 transition-transform">
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button className="rounded-full px-8 shadow-md hover:shadow-lg transition-all">View All Services</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Preview (Static for now) */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="max-w-2xl space-y-4">
              <p className="text-primary font-bold tracking-wide uppercase text-sm">Patient Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Don&apos;t Just Take Our Word For It</h2>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 border px-6 py-4 rounded-full shadow-sm">
              <div className="flex -space-x-2">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <p className="font-bold text-gray-900">4.9 on Google (145+ Reviews)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Rahul S.", review: "Dr. Sudhakar is amazing! He explained my orthodontic treatment clearly and the results are better than I expected. Highly recommend Pranav's clinic." },
              { name: "Priya M.", review: "Very professional and clean clinic. I went for a root canal and felt absolutely no pain. The staff is extremely polite and welcoming." },
              { name: "Karthik V.", review: "Got my invisible aligners from here. The pricing is transparent and affordable. The doctor is very patient in answering all questions." }
            ].map((review, i) => (
              <Card key={i} className="bg-gray-50 border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-8 space-y-6">
                  <div className="flex text-amber-400 gap-1">
                    {Array(5).fill(0).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic">&quot;{review.review}&quot;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-xs text-gray-500">Verified Patient</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-900 text-white relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">Ready to Achieve Your Perfect Smile?</h2>
              <p className="text-gray-400 text-lg">Visit us at our state-of-the-art clinic. We are conveniently located in Velachery.</p>

              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg">Clinic Location</h4>
                    <p className="text-gray-300 mt-1 leading-relaxed">Velachery Main Rd, Ram Nagar,<br />Ramnagar South, Dhadeswaram Nagar,<br />Velachery, Chennai, Tamil Nadu 600042</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/appointment">
                  <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 border-primary">Book Now</Button>
                </Link>
                <a href="https://maps.google.com/?q=Velachery+Main+Rd+Ram+Nagar+Chennai" target="_blank" rel="noreferrer">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 bg-transparent text-white hover:bg-white/10">Get Directions</Button>
                </a>
              </div>
            </div>

            <div className="aspect-square md:aspect-[4/3] w-full rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.8929787498263!2d80.2183204!3d12.9787053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzQzLjMiTiA4MMKwMTMnMDYuMCI!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clinic Location Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
