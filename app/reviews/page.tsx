import { supabase } from '@/lib/supabase';
import { Star } from 'lucide-react';

export const revalidate = 60; // Revalidate at most every 60 seconds

export default async function ReviewsPage() {
    const { data: reviews, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

    // Calculating summary if data exists
    const totalReviews = reviews?.length || 0;
    const averageRating = totalReviews > 0
        ? (reviews!.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
        : "0.0";

    return (
        <div className="pt-20 pb-24 bg-gray-50/50 min-h-screen">
            <div className="bg-primary/5 py-16 mb-16 border-b border-primary/10">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Patient Reviews</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">Read what our patients have to say about their real experiences at Pranav&apos;s Dental Care.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {/* Summary Card */}
                <div className="max-w-4xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-10 mb-20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>

                    <div className="flex flex-col md:flex-row items-center gap-8 relative z-10 text-center md:text-left">
                        <div className="text-7xl md:text-8xl font-black text-gray-900 tracking-tighter drop-shadow-sm">
                            {averageRating}
                        </div>
                        <div>
                            <div className="flex text-amber-400 gap-1.5 mb-3 justify-center md:justify-start drop-shadow-sm">
                                {Array(5).fill(0).map((_, i) => (
                                    <Star key={i} className={`w-8 h-8 ${i < Math.round(Number(averageRating)) ? 'fill-current' : 'text-gray-200'}`} />
                                ))}
                            </div>
                            <p className="text-gray-600 font-medium text-lg">Based on <span className="font-bold text-gray-900 border-b-2 border-primary/30 pb-0.5">{totalReviews}</span> verified patient reviews</p>
                        </div>
                    </div>

                    <div className="relative z-10 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-8 md:pt-0 md:pl-10">
                        <a href="https://g.page/r/pranav-dental-care/review" target="_blank" rel="noreferrer" className="w-full md:w-auto inline-flex justify-center items-center px-8 py-5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            <svg className="w-6 h-6 mr-3 text-amber-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12.0001 2.92703L14.7719 8.54308L21.0488 9.45693L16.5049 13.8814L17.5768 20.1417L12.0001 17.2087L6.42336 20.1417L7.49528 13.8814L2.95142 9.45693L9.22831 8.54308L12.0001 2.92703Z" /></svg>
                            Write a Google Review
                        </a>
                    </div>
                </div>

                {error && (
                    <div className="text-center py-20 bg-red-50 rounded-[2rem] border border-red-100 shadow-sm max-w-3xl mx-auto">
                        <p className="text-red-500 font-bold text-lg">Failed to load reviews. Please check database connection.</p>
                    </div>
                )}

                {!error && reviews && reviews.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-inner">
                            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No reviews found yet.</h3>
                        <p className="text-gray-500 font-medium text-lg">Be the first to share your experience!</p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {reviews?.map((review) => (
                        <div key={review.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 flex flex-col justify-between group">
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-transparent rounded-full flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shrink-0">
                                            {review.patient_name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-lg leading-tight group-hover:text-primary transition-colors">{review.patient_name}</p>
                                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mt-0.5">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                    <div className="bg-amber-50 px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-amber-100 shrink-0">
                                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                        <span className="font-bold text-amber-600 text-sm leading-none">{review.rating}.0</span>
                                    </div>
                                </div>
                                <div className="relative">
                                    <span className="absolute -top-3 -left-2 text-5xl text-gray-100 font-serif leading-none select-none pointer-events-none">&quot;</span>
                                    <p className="text-gray-700 leading-relaxed font-medium relative z-10">{review.review_text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
