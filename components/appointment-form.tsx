'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z.string().min(10, "Valid phone number is required"),
    email: z.string().email("Invalid email address").optional().or(z.literal('')),
    treatment_type: z.string().min(2, "Please select a treatment type"),
    preferred_date: z.string().min(1, "Please select a preferred date"),
    preferred_time: z.string().min(1, "Please select a preferred time"),
    message: z.string().max(500, "Message is too long").optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function AppointmentForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            const { error: dbError } = await supabase
                .from('appointments')
                .insert([data]);

            if (dbError) throw dbError;

            setSuccess(true);
            reset();
        } catch (err: unknown) {
            console.error('Error booking appointment:', err);
            setError('Failed to book appointment. Please make sure the database setup matches the real Supabase schema context or try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-50 text-green-800 p-8 md:p-12 rounded-[2.5rem] border border-green-200 text-center space-y-5 shadow-lg animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-500" />
                    </div>
                </div>
                <h3 className="text-3xl font-extrabold tracking-tight">Appointment Requested!</h3>
                <p className="text-green-700 text-lg max-w-sm mx-auto">Thank you for choosing Pranav&apos;s Dental Care. Our team will contact you shortly to confirm your exact time slot.</p>
                <div className="pt-6">
                    <Button onClick={() => setSuccess(false)} variant="outline" className="border-green-300 text-green-700 hover:bg-green-100 rounded-xl h-12 px-8">
                        Book Another Appointment
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-gray-100 relative group overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {error && (
                <div className="bg-red-50 text-red-600 p-5 rounded-2xl border border-red-100 text-sm font-medium flex items-center gap-3">
                    <div className="bg-red-100 text-red-500 p-2 rounded-full shrink-0">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2.5">
                    <Label htmlFor="name" className="text-gray-700 font-bold tracking-wide uppercase text-xs flex items-center gap-1">Full Name <span className="text-red-500">*</span></Label>
                    <Input id="name" {...register('name')} placeholder="John Doe" className="h-14 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-primary/20 hover:border-gray-300 transition-all font-medium placeholder:text-gray-400" />
                    {errors.name && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-gray-700 font-bold tracking-wide uppercase text-xs flex items-center gap-1">Phone Number <span className="text-red-500">*</span></Label>
                    <Input id="phone" type="tel" {...register('phone')} placeholder="+91 98765 43210" className="h-14 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-primary/20 hover:border-gray-300 transition-all font-medium placeholder:text-gray-400" />
                    {errors.phone && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.phone.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2.5">
                    <Label htmlFor="email" className="text-gray-700 font-bold tracking-wide uppercase text-xs">Email Address (Optional)</Label>
                    <Input id="email" type="email" {...register('email')} placeholder="john@example.com" className="h-14 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-primary/20 hover:border-gray-300 transition-all font-medium placeholder:text-gray-400" />
                    {errors.email && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.email.message}</p>}
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="treatment_type" className="text-gray-700 font-bold tracking-wide uppercase text-xs flex items-center gap-1">Treatment Interested In <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <select
                            id="treatment_type"
                            {...register('treatment_type')}
                            className="flex h-14 w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white font-medium hover:border-gray-300 transition-all appearance-none"
                        >
                            <option value="" disabled hidden>Select Treatment</option>
                            <option value="General Checkup">General Checkup</option>
                            <option value="Braces & Orthodontics">Braces & Orthodontics</option>
                            <option value="Invisalign">Invisalign (Clear Aligners)</option>
                            <option value="Root Canal">Root Canal</option>
                            <option value="Dental Implants">Dental Implants</option>
                            <option value="Teeth Whitening">Teeth Whitening</option>
                            <option value="Other">Other / Not Sure</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.treatment_type && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.treatment_type.message}</p>}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2.5">
                    <Label htmlFor="preferred_date" className="text-gray-700 font-bold tracking-wide uppercase text-xs flex items-center gap-1">Preferred Date <span className="text-red-500">*</span></Label>
                    <Input id="preferred_date" type="date" {...register('preferred_date')} min={new Date().toISOString().split('T')[0]} className="h-14 rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-primary/20 hover:border-gray-300 transition-all font-medium text-gray-700" />
                    {errors.preferred_date && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.preferred_date.message}</p>}
                </div>
                <div className="space-y-2.5">
                    <Label htmlFor="preferred_time" className="text-gray-700 font-bold tracking-wide uppercase text-xs flex items-center gap-1">Preferred Time <span className="text-red-500">*</span></Label>
                    <div className="relative">
                        <select
                            id="preferred_time"
                            {...register('preferred_time')}
                            className="flex h-14 w-full items-center justify-between rounded-2xl border border-gray-200 bg-gray-50/50 px-4 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 focus:bg-white transition-all font-medium hover:border-gray-300 appearance-none"
                        >
                            <option value="" disabled hidden>Select Time Preference</option>
                            <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                            <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                            <option value="Evening (4 PM - 8 PM)">Evening (4 PM - 8 PM)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    {errors.preferred_time && <p className="text-red-500 text-xs font-bold pl-1 animate-in slide-in-from-top-1">{errors.preferred_time.message}</p>}
                </div>
            </div>

            <div className="space-y-2.5 relative z-10">
                <Label htmlFor="message" className="text-gray-700 font-bold tracking-wide uppercase text-xs">Additional Notes (Optional)</Label>
                <Textarea id="message" {...register('message')} placeholder="Explain any specific symptoms or concerns you might have..." className="min-h-[140px] rounded-2xl bg-gray-50/50 border-gray-200 focus:bg-white focus:ring-primary/20 hover:border-gray-300 transition-all resize-none p-4 font-medium placeholder:text-gray-400" />
            </div>

            <div className="pt-2 relative z-10">
                <Button type="submit" disabled={isSubmitting} className="w-full h-14 text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                    {isSubmitting ? (
                        <><Loader2 className="w-6 h-6 mr-2 animate-spin" /> Submitting Request...</>
                    ) : (
                        "Confirm Appointment Request"
                    )}
                </Button>
            </div>
        </form>
    );
}
