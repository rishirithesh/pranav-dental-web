import AppointmentForm from '@/components/appointment-form';
import { Phone, Clock, MapPin } from 'lucide-react';

export default function AppointmentPage() {
    return (
        <div className="pt-20 pb-24 bg-gray-50/50 min-h-screen">
            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">

                    <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32 h-fit">
                        <div>
                            <p className="text-primary font-bold tracking-widest uppercase text-sm mb-3 flex items-center gap-2">
                                <span className="w-8 h-1 bg-primary rounded-full"></span> Book Your Visit
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight mb-6">Let&apos;s Give You a <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Reason to Smile.</span></h1>
                            <p className="text-lg text-gray-600 leading-relaxed font-medium">Fill out the form to request an appointment. Our team will get back to you promptly to confirm your exact date and time slot.</p>
                        </div>

                        <div className="space-y-6 pt-8 border-t border-gray-200/60">
                            <div className="flex items-start gap-5 group">
                                <div className="bg-white p-4 rounded-2xl shadow-sm shadow-blue-900/5 border border-gray-100/50 text-blue-500 shrink-0 group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Emergency Case?</h3>
                                    <p className="text-gray-600 mb-2 font-medium">Call us immediately for urgent dental care.</p>
                                    <a href="tel:+919841874253" className="text-primary font-black text-xl hover:text-secondary transition-colors inline-flex items-center gap-1">
                                        +91 98418 74253
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-white p-4 rounded-2xl shadow-sm shadow-blue-900/5 border border-gray-100/50 text-emerald-500 shrink-0 group-hover:scale-110 group-hover:bg-emerald-50 transition-all duration-300">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">Working Hours</h3>
                                    <div className="space-y-1 mt-1 text-gray-600 font-medium">
                                        <p className="flex justify-between items-center bg-gray-100/50 px-3 py-1.5 rounded-lg border border-gray-200/50"><span>Mon - Sat</span> <span className="text-gray-900 font-bold">9:00 AM - 9:00 PM</span></p>
                                        <p className="flex justify-between items-center px-3 py-1.5 rounded-lg"><span>Sunday</span> <span className="text-gray-900 font-bold">9:00 AM - 1:00 PM</span></p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start gap-5 group">
                                <div className="bg-white p-4 rounded-2xl shadow-sm shadow-blue-900/5 border border-gray-100/50 text-amber-500 shrink-0 group-hover:scale-110 group-hover:bg-amber-50 transition-all duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-1">Clinic Location</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">Velachery Main Rd, Ram Nagar,<br />Ramnagar South, Dhadeswaram Nagar,<br />Velachery, Chennai 600042</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7">
                        <AppointmentForm />
                    </div>

                </div>
            </div>
        </div>
    );
}
