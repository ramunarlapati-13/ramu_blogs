
import Link from "next/link";

const BLOG_POSTS = [
    {
        slug: "future-of-high-altitude-wind-energy",
        title: "The Future of High-Altitude Wind Energy",
        description: "Exploring the untapped potential of airborne wind turbines and how they could revolutionize renewable energy.",
        date: "January 3, 2026",
        category: "Energy",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=2670&auto=format&fit=crop"
    },
    // Placeholder for another post if needed
];

export default function BlogsPage() {
    return (
        <div className="min-h-screen bg-black text-white px-6 py-12">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                        Latest Articles
                    </h1>
                    <p className="mt-4 text-zinc-400 text-lg max-w-2xl">
                        Thoughts, ideas, and stories about technology, design, and the future.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blogs/${post.slug}`}
                            className="group relative flex flex-col overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:border-zinc-700"
                        >
                            <div className="aspect-video w-full overflow-hidden">
                                {/* Using standard img for now to avoid domain config issues with Next/Image, or I could use Next/Image if domains were configured */}
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <div className="mb-4 flex items-center gap-3 text-xs font-medium text-zinc-400">
                                    <span className="rounded-full bg-indigo-500/10 px-2 py-1 text-indigo-400">
                                        {post.category}
                                    </span>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <h3 className="mb-2 text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="flex-1 text-sm text-zinc-400">
                                    {post.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
