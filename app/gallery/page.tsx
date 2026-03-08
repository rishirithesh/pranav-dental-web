import { supabase } from '@/lib/supabase';
import Image from 'next/image';

export const revalidate = 60; // Revalidate every 60s

export default async function GalleryPage({ searchParams }: { searchParams: { category?: string } }) {
    const category = searchParams.category || 'All';

    let query = supabase.from('gallery').select('*').order('created_at', { ascending: false });
    if (category !== 'All') {
        query = query.eq('category', category);
    }

    const { data: images, error } = await query;

    const categories = ['All', 'Braces', 'Invisalign', 'Implants', 'Cosmetic', 'Whitening'];

    return (
        <div className="pt-20 pb-24 bg-gray-50/50 min-h-screen">
            <div className="bg-primary/5 py-16 mb-12 border-b border-primary/10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] pointer-events-none"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">Smile Gallery</h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">Real results from real patients. See the beautiful transformations achieved at our clinic.</p>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-16 relative z-10">
                    {categories.map(cat => (
                        <a
                            key={cat}
                            href={`/gallery?category=${cat}`}
                            className={`px-6 md:px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 ${category === cat ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105' : 'bg-white text-gray-600 border border-gray-200 hover:border-primary/50 hover:text-primary hover:bg-primary/5 hover:scale-105 shadow-sm'}`}
                        >
                            {cat}
                        </a>
                    ))}
                </div>

                {error && (
                    <div className="text-center py-20 bg-red-50 rounded-[2rem] border border-red-100 shadow-sm max-w-3xl mx-auto">
                        <p className="text-red-500 font-bold text-lg">Failed to load gallery images. Please check database connection.</p>
                    </div>
                )}

                {!error && images && images.length === 0 && (
                    <div className="text-center py-24 bg-white rounded-[3rem] border border-gray-100 shadow-sm max-w-4xl mx-auto">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100 shadow-inner">
                            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </div>
                        <p className="text-gray-900 font-bold text-2xl mb-2">No images found for &quot;{category}&quot;.</p>
                        <p className="text-gray-500 font-medium mb-6">We&apos;ll be adding more transformation photos here soon.</p>
                        {category !== 'All' && <a href="/gallery" className="inline-flex items-center px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-xl transition-colors">View all images instead</a>}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {images?.map((img) => (
                        <div key={img.id} className="group relative aspect-[4/3] bg-gray-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border-4 border-white transition-all duration-500 cursor-pointer">
                            {/* next/image optimization configured safely */}
                            <Image
                                src={img.image_url}
                                alt={`${img.category} Result`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                                <div className="p-6 text-white w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold tracking-widest uppercase mb-3 border border-white/30 shadow-sm">{img.category}</span>
                                    <div className="flex items-center justify-between">
                                        <p className="font-bold text-xl drop-shadow-md">Before & After</p>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:bg-primary transition-colors duration-300">
                                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
