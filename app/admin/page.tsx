'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, LayoutDashboard, Calendar, Image as ImageIcon, Star, Settings } from 'lucide-react';

export default function AdminPage() {
    const [session, setSession] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState('');
    const [activeTab, setActiveTab] = useState('appointments');

    // Dashboard Data State
    const [appointments, setAppointments] = useState<any[]>([]);
    const [reviews, setReviews] = useState<any[]>([]);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadCategory, setUploadCategory] = useState('Braces');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
            if (session) fetchDashboardData();
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) fetchDashboardData();
        });

        return () => subscription.unsubscribe();
    }, []);

    const fetchDashboardData = async () => {
        // Fetch Appointments
        const { data: appts } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
        if (appts) setAppointments(appts);

        // Fetch Reviews
        const { data: revs } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
        if (revs) setReviews(revs);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setAuthError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) setAuthError(error.message);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload-image', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();

            if (data.url) {
                await supabase.from('gallery').insert([{ image_url: data.url, category: uploadCategory }]);
                alert('Image uploaded successfully to gallery!');
            } else {
                alert('Failed to upload image to R2');
            }
        } catch (err) {
            console.error(err);
            alert('Error uploading image');
        } finally {
            setUploadingImage(false);
        }
    };

    const updateAppointmentStatus = async (id: string, status: string) => {
        await supabase.from('appointments').update({ status }).eq('id', id);
        fetchDashboardData();
    };

    if (loading && !session) {
        return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Portal</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">Sign in to manage Pranav's Dental Care</p>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-100">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            {authError && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">{authError}</div>}
                            <div>
                                <Label htmlFor="email">Email address</Label>
                                <div className="mt-1">
                                    <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="mt-1">
                                    <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                            </div>

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                                Sign in
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-3 rounded-xl text-primary"><LayoutDashboard className="w-6 h-6" /></div>
                        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>
                    <Button variant="outline" onClick={handleLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                        <LogOut className="w-4 h-4 mr-2" /> Sign out
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Nav (Fallback since shadcn tabs not strictly present) */}
                    <div className="md:col-span-1 space-y-2">
                        {[
                            { id: 'appointments', label: 'Appointments', icon: Calendar },
                            { id: 'gallery', label: 'Gallery Upload', icon: ImageIcon },
                            { id: 'reviews', label: 'Manage Reviews', icon: Star },
                            { id: 'settings', label: 'Clinic Settings', icon: Settings },
                        ].map(item => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${activeTab === item.id ? 'bg-primary text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-100'}`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        ))}
                    </div>

                    <div className="md:col-span-3">

                        {activeTab === 'appointments' && (
                            <Card className="border-none shadow-sm shadow-gray-200">
                                <CardHeader className="bg-white rounded-t-xl border-b border-gray-100">
                                    <CardTitle>Recent Appointments</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 bg-white rounded-b-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                                                <tr>
                                                    <th className="px-6 py-4 font-bold">Patient Details</th>
                                                    <th className="px-6 py-4 font-bold">Preference</th>
                                                    <th className="px-6 py-4 font-bold">Treatment</th>
                                                    <th className="px-6 py-4 font-bold">Status</th>
                                                    <th className="px-6 py-4 font-bold text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {appointments.map((appt) => (
                                                    <tr key={appt.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                                        <td className="px-6 py-4">
                                                            <p className="font-bold text-gray-900">{appt.name}</p>
                                                            <p className="text-gray-500 text-xs mt-1">{appt.phone}</p>
                                                            <p className="text-gray-500 text-xs">{appt.email}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="font-medium text-gray-900">{new Date(appt.preferred_date).toLocaleDateString()}</p>
                                                            <p className="text-gray-500 text-xs mt-1">{appt.preferred_time}</p>
                                                        </td>
                                                        <td className="px-6 py-4 font-medium text-primary">
                                                            {appt.treatment_type}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${appt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                                                {appt.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-6 py-4 text-right space-x-2">
                                                            {appt.status !== 'confirmed' && (
                                                                <Button size="sm" variant="outline" className="border-green-200 text-green-600 hover:bg-green-50" onClick={() => updateAppointmentStatus(appt.id, 'confirmed')}>Confirm</Button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}
                                                {appointments.length === 0 && (
                                                    <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No appointments found.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'gallery' && (
                            <Card className="border-none shadow-sm shadow-gray-200">
                                <CardHeader className="bg-white rounded-t-xl border-b border-gray-100">
                                    <CardTitle>Upload to Smile Gallery</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 bg-white rounded-b-xl space-y-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Image Category</Label>
                                        <select
                                            id="category"
                                            value={uploadCategory}
                                            onChange={(e) => setUploadCategory(e.target.value)}
                                            className="w-full border border-gray-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50"
                                        >
                                            {['Braces', 'Invisalign', 'Implants', 'Cosmetic', 'Whitening'].map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-10 text-center bg-gray-50 hover:bg-gray-100 transition-colors relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            disabled={uploadingImage}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                                        />
                                        {uploadingImage ? (
                                            <div className="flex flex-col items-center"><Loader2 className="w-10 h-10 animate-spin text-primary mb-3" /><p className="font-medium text-gray-600">Uploading to Cloudflare R2...</p></div>
                                        ) : (
                                            <div className="flex flex-col items-center"><ImageIcon className="w-10 h-10 text-gray-400 mb-3" /><p className="font-medium text-gray-600">Click or drag image to upload</p><p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p></div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'reviews' && (
                            <Card className="border-none shadow-sm shadow-gray-200">
                                <CardHeader className="bg-white rounded-t-xl border-b border-gray-100">
                                    <CardTitle>Manage Reviews</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 bg-white rounded-b-xl overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-500 bg-gray-50 uppercase border-b border-gray-100">
                                                <tr>
                                                    <th className="px-6 py-4 font-bold">Patient Details</th>
                                                    <th className="px-6 py-4 font-bold">Review Text</th>
                                                    <th className="px-6 py-4 font-bold text-center">Rating</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {reviews.map((rev) => (
                                                    <tr key={rev.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            <p className="font-bold text-gray-900">{rev.patient_name}</p>
                                                            <p className="text-gray-500 text-xs mt-1">{new Date(rev.date).toLocaleDateString()}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="text-gray-600 text-sm line-clamp-2">"{rev.review_text}"</p>
                                                        </td>
                                                        <td className="px-6 py-4 text-center font-bold text-amber-500">
                                                            {rev.rating}/5
                                                        </td>
                                                    </tr>
                                                ))}
                                                {reviews.length === 0 && (
                                                    <tr><td colSpan={3} className="px-6 py-8 text-center text-gray-500">No reviews found.</td></tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {activeTab === 'settings' && (
                            <Card className="border-none shadow-sm shadow-gray-200">
                                <CardHeader className="bg-white rounded-t-xl border-b border-gray-100">
                                    <CardTitle>Clinic Settings</CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 bg-white rounded-b-xl">
                                    <p className="text-gray-600">Settings and configuration will be available in future updates.</p>
                                </CardContent>
                            </Card>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
