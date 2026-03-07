import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
    return (
        <div className="pt-20 pb-24">
            <div className="bg-primary/5 py-16 mb-16 border-b border-primary/10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">About Pranav's Dental Care</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Committed to excellence in dentistry with specialized focus on orthodontics and comprehensive care in Velachery.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1 space-y-6 text-gray-600 text-lg leading-relaxed">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Dr. Sudhakar Venkatachalapathy</h2>
                        <p>
                            Dr. Sudhakar Venkatachalapathy is a highly skilled and experienced Orthodontist dedicated to providing exceptional dental care in Chennai. With over a decade of clinical experience, he specializes in treating complex orthodontic cases, utilizing state-of-the-art methodology to ensure perfect smiles.
                        </p>
                        <p>
                            His approach to dentistry combines a deep understanding of facial aesthetics with a commitment to patient comfort. At Pranav's Dental Care, the focus is not just treating teeth, but on enhancing overall oral health and patient confidence.
                        </p>
                        <div className="pt-6">
                            <h3 className="font-bold text-xl text-gray-900 mb-4">Our Clinic Philosophy</h3>
                            <ul className="space-y-4">
                                {[
                                    "Patient-First Approach: Listening to your needs and concerns.",
                                    "Painless Dentistry: Utilizing modern techniques for maximum comfort.",
                                    "Transparent Pricing: No hidden costs, just honest care.",
                                    "Top-tier Hygiene: Strict sterilization protocols for ultimate safety."
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-3 items-start">
                                        <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />
                                        <span className="text-gray-700 font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="order-1 md:order-2">
                        <div className="aspect-[4/5] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl relative border-8 border-white group">
                            {/* Doctor Image Placeholder */}
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-indigo-50 flex items-center justify-center text-center p-8 group-hover:scale-105 transition-transform duration-700">
                                <div className="text-primary/40 font-bold text-2xl">
                                    [ Dr. Sudhakar's Portrait ]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-32">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Clinic Tour</h2>
                        <p className="text-gray-600">Experience our modern, welcoming environment equipped with advanced technology.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                                <div className="w-full h-full bg-gradient-to-tr from-gray-200 to-gray-100 flex items-center justify-center text-gray-400 font-medium hover:scale-110 transition-transform duration-500">
                                    [ Clinic Photo {i} ]
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
