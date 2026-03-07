'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Calendar, Phone } from 'lucide-react';

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50 py-24 md:py-32">
            {/* Background aesthetics */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 rounded-l-full blur-3xl -z-10 translate-x-1/3 opacity-70"></div>
            <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-secondary/5 rounded-r-full blur-3xl -z-10 -translate-x-1/2 opacity-60"></div>

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20">

                    <motion.div
                        className="flex-1 space-y-8 text-center md:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-primary text-sm font-semibold tracking-wide shadow-sm">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                            </span>
                            Accepting New Patients
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                            Creating Healthy & <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Beautiful Smiles</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0 leading-relaxed font-medium">
                            Experience modern, pain-free dentistry with Dr. Sudhakar Venkatachalapathy. We blend advanced technology with compassionate care in Chennai.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start pt-4">
                            <Link href="/appointment">
                                <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                                    <Calendar className="w-5 h-5 mr-2" />
                                    Book Appointment
                                </Button>
                            </Link>
                            <a href="tel:+919841874253">
                                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8 rounded-full border-2 hover:bg-gray-50 transition-all duration-300">
                                    <Phone className="w-5 h-5 mr-2" />
                                    Call Now
                                </Button>
                            </a>
                        </div>

                        <div className="flex items-center gap-4 justify-center md:justify-start pt-6">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className={`w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-sm bg-blue-${i}00 flex justify-center items-center text-xs font-bold text-white bg-gradient-to-br from-primary to-secondary`}>
                                        {String.fromCharCode(64 + i)}
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm font-medium">
                                <div className="flex items-center gap-1 text-amber-400">
                                    {Array(5).fill(0).map((_, i) => <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                                </div>
                                <p className="text-gray-600"><span className="font-bold text-gray-900">4.9/5</span> (145+ Google reviews)</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex-1 w-full max-w-lg relative"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        <div className="aspect-[4/5] md:aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative border-[6px] border-white/80 bg-gradient-to-tr from-blue-100 to-teal-50 flex items-center justify-center group">
                            <div className="text-center p-8 text-primary/40 font-bold text-xl group-hover:scale-110 transition-transform duration-500">
                                [ Clinic Photo Here ]
                            </div>
                            <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500"></div>
                        </div>

                        {/* Floating badge */}
                        <motion.div
                            className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100 z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                        >
                            <div className="bg-green-100 p-3 rounded-full text-green-600 shadow-sm border border-green-200">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Orthodontist</p>
                                <p className="font-bold text-gray-900 leading-none">Dr. Sudhakar</p>
                            </div>
                        </motion.div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
