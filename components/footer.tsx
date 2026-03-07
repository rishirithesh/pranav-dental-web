import Link from 'next/link';
import { Phone, MapPin, Mail, Instagram, Facebook, Clock } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t pt-16 pb-8 mt-auto">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div className="space-y-4">
                        <div>
                            <h2 className="font-bold text-2xl tracking-tight text-gray-900 leading-none">Pranav's</h2>
                            <p className="text-sm text-primary font-medium tracking-wider uppercase mt-1">Dental Care</p>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mt-4">
                            Providing exceptional dental care with modern technology and a gentle touch. Creating healthy and beautiful smiles in Chennai.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="#" className="p-2 bg-white shadow-sm border rounded-full text-gray-600 hover:text-primary hover:border-primary/30 transition-all">
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2 bg-white shadow-sm border rounded-full text-gray-600 hover:text-primary hover:border-primary/30 transition-all">
                                <Instagram className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Quick Links</h3>
                        <ul className="space-y-3 font-medium text-sm text-gray-600">
                            <li><Link href="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">About Us</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Our Services</Link></li>
                            <li><Link href="/gallery" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Smile Gallery</Link></li>
                            <li><Link href="/reviews" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Patient Reviews</Link></li>
                            <li><Link href="/appointment" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Book Appointment</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Services</h3>
                        <ul className="space-y-3 font-medium text-sm text-gray-600">
                            <li><Link href="/services#braces" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Braces & Aligners</Link></li>
                            <li><Link href="/services#implants" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Dental Implants</Link></li>
                            <li><Link href="/services#root-canal" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Root Canal</Link></li>
                            <li><Link href="/services#whitening" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Teeth Whitening</Link></li>
                            <li><Link href="/services#pediatric" className="hover:text-primary transition-colors hover:translate-x-1 inline-block transform">Pediatric Dentistry</Link></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-bold text-lg mb-4 text-gray-900">Contact Info</h3>
                        <div className="flex gap-3 text-sm text-gray-600 group">
                            <MapPin className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                            <p>Velachery Main Rd, Ram Nagar, Ramnagar South, Velachery, Chennai</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 group">
                            <Phone className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                            <p>+91 98418 74253</p>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 group">
                            <Mail className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform" />
                            <p>info@pranavsdentalcare.com</p>
                        </div>
                        <div className="flex items-start gap-3 text-sm text-gray-600 group">
                            <Clock className="w-5 h-5 text-primary shrink-0 group-hover:scale-110 transition-transform mt-0.5" />
                            <div>
                                <p>Mon - Sat: 9:00 AM - 9:00 PM</p>
                                <p>Sunday: 9:00 AM - 1:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-medium">
                    <p>© {new Date().getFullYear()} Pranav's Dental Care. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
