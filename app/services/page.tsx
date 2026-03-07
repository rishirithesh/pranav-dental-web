import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
    const servicesList = [
        {
            id: "braces",
            title: "Braces & Orthodontics",
            description: "Traditional and ceramic braces to correct misaligned teeth and jaw structure.",
            procedure: "Placement of brackets on teeth connected by wires to gradually shift teeth into the correct position.",
            recovery: "Mild discomfort for a few days after adjustments.",
            cost: "Starts from ₹25,000",
            faq: "Duration varies from 6 to 24 months based on complexity.",
            icon: "🦷"
        },
        {
            id: "invisalign",
            title: "Invisalign (Clear Aligners)",
            description: "Invisible, removable aligners for a discreet straightening treatment.",
            procedure: "Custom-made clear trays worn over teeth, changed every 1-2 weeks.",
            recovery: "Almost immediate adaptation.",
            cost: "Starts from ₹80,000",
            faq: "Must be worn 20-22 hours a day for effective results.",
            icon: "✨"
        },
        {
            id: "root-canal",
            title: "Root Canal Treatment",
            description: "Save a severely infected or decayed tooth to avoid extraction.",
            procedure: "Removal of infected pulp, cleaning and sealing the root canal, followed by a crown.",
            recovery: "Completely painless during the procedure; mild sensitivity for 1-2 days.",
            cost: "Starts from ₹3,500",
            faq: "Usually completed in a single sitting using rotary machines.",
            icon: "⚡"
        },
        {
            id: "implants",
            title: "Dental Implants",
            description: "Permanent replacement for missing teeth using titanium root equivalents.",
            procedure: "Surgical placement of titanium screw into the jawbone, eventually fitted with a crown.",
            recovery: "Surgical site heals in 7-10 days. Bone integration takes 3-6 months.",
            cost: "Starts from ₹20,000 per implant",
            faq: "Can last a lifetime with proper care.",
            icon: "💎"
        },
        {
            id: "whitening",
            title: "Teeth Whitening",
            description: "Professional bleaching to remove stains and brighten your smile.",
            procedure: "Application of specialized bleaching gel under a blue light curing system.",
            recovery: "Immediate results; slight sensitivity for 24 hours.",
            cost: "Starts from ₹5,000",
            faq: "Results typically last 1-3 years depending on dietary habits.",
            icon: "🌟"
        },
        {
            id: "extraction",
            title: "Tooth Extraction",
            description: "Safe and painless removal of non-restorable or wisdom teeth.",
            procedure: "Local anesthesia administered, followed by careful luxation and removal.",
            recovery: "Soft diet for 2 days; complete healing in 1 week.",
            cost: "Starts from ₹800",
            faq: "Wisdom teeth removal might involve minor surgery and stitches.",
            icon: "🧰"
        },
        {
            id: "pediatric",
            title: "Pediatric Dentistry",
            description: "Gentle and specialized dental care for children and teens.",
            procedure: "Preventive treatments, fluorides, sealants, and cavity fillings.",
            recovery: "None usually required; painless procedures.",
            cost: "Varies depending on treatment",
            faq: "First visit recommended at age 1 or when the first tooth appears.",
            icon: "🧒"
        },
        {
            id: "scaling",
            title: "Scaling & Polishing",
            description: "Routine professional cleaning to remove tartar, plaque, and stains.",
            procedure: "Ultrasonic scaling tool used to clean teeth and below gum lines, followed by polishing.",
            recovery: "Immediate; you can eat right after.",
            cost: "Starts from ₹1,000",
            faq: "Recommended every 6 months for optimal oral health.",
            icon: "🧼"
        }
    ];

    return (
        <div className="pt-20 pb-24">
            <div className="bg-primary/5 py-16 mb-16 border-b border-primary/10">
                <div className="container mx-auto px-4 text-center text-balance">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Our Dental Services</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Comprehensive treatments tailored to your unique oral health needs and smile goals.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {servicesList.map((service) => (
                        <Card key={service.id} id={service.id} className="scroll-mt-32 shadow-sm hover:shadow-xl transition-all duration-300 border-gray-100 overflow-hidden group relative">
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-[0.08] transition-opacity duration-500 text-9xl pointer-events-none -mr-10 -mt-10">
                                {service.icon}
                            </div>
                            <CardHeader className="bg-gray-50/50 border-b border-gray-100 pb-5 z-10 relative">
                                <CardTitle className="flex items-center gap-4 text-2xl font-bold text-gray-900 tracking-tight">
                                    <span className="text-3xl bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm text-primary group-hover:scale-110 transition-transform duration-300 border border-gray-100">{service.icon}</span>
                                    {service.title}
                                </CardTitle>
                                <p className="text-gray-600 font-medium text-[1.05rem] pt-3 leading-relaxed">{service.description}</p>
                            </CardHeader>
                            <CardContent className="p-6 space-y-5 text-gray-700 bg-white relative z-10">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase text-primary/90 mb-1.5 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-primary rounded-full"></div> Procedure</h4>
                                    <p className="text-sm leading-relaxed pl-3.5 border-l-2 border-gray-100">{service.procedure}</p>
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm tracking-widest uppercase text-primary/90 mb-1.5 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-secondary rounded-full"></div> Recovery Time</h4>
                                    <p className="text-sm leading-relaxed pl-3.5 border-l-2 border-gray-100">{service.recovery}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-5 rounded-2xl mt-6 border border-gray-100 group-hover:border-primary/20 transition-colors duration-300">
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-[10px] tracking-widest uppercase mb-1.5 text-gray-500">Cost Estimate</h4>
                                        <p className="text-[15px] font-bold text-accent">{service.cost}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-[10px] tracking-widest uppercase mb-1.5 text-gray-500">Key FAQ</h4>
                                        <p className="text-xs text-gray-600 leading-tight">{service.faq}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="mt-24 text-center bg-blue-50 p-12 md:p-16 rounded-[3rem] border border-blue-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 group-hover:scale-110 transition-transform duration-700"></div>

                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 relative z-10 tracking-tight">Not Sure Which Treatment You Need?</h2>
                    <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto relative z-10">Book a consultation with Dr. Sudhakar to get a personalized treatment plan and cost estimate tailored specifically for you.</p>
                    <Link href="/appointment" className="relative z-10 inline-block">
                        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-5 px-10 rounded-full shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-3 mx-auto text-lg">
                            Book a Consultation Now <ArrowRight className="w-6 h-6" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
