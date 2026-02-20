import { MetadataRoute } from 'next';
import { BLOG_CONTENT } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ramublogs.vercel.app';

    // Static routes
    const routes = [
        '',
        '/blogs',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Blog posts
    const blogRoutes = Object.keys(BLOG_CONTENT).map((slug) => {
        const post = BLOG_CONTENT[slug as keyof typeof BLOG_CONTENT];
        // Convert "January 3, 2026" to Date object if possible, otherwise use fallback
        const date = new Date(post.date);
        const lastModified = isNaN(date.getTime()) ? new Date() : date;

        return {
            url: `${baseUrl}/blogs/${slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        };
    });

    return [...routes, ...blogRoutes];
}
