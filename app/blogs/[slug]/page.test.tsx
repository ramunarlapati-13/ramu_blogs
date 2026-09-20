import { render } from '@testing-library/react';
import BlogPost from './page';

// Mock BLOG_CONTENT to include potentially dangerous characters like <script> tag breakout
jest.mock('../../../lib/data', () => ({
    BLOG_CONTENT: {
        'test-slug': {
            title: 'Test Title </script><script>alert("XSS")</script>',
            date: '2025-01-01',
            category: 'Testing',
            readTime: '5 min',
            heroImage: 'https://example.com/image.jpg',
            author: {
                name: 'Test Author </script>',
                avatar: 'https://example.com/avatar.jpg',
            },
            content: [
                {
                    type: 'paragraph',
                    text: 'Test paragraph content with <script>alert(1)</script> and & symbol.',
                },
            ],
        },
    },
}));

describe('BlogPost Component', () => {
    it('escapes HTML special characters in application/ld+json script tag', async () => {
        const ResolvedBlogPost = await BlogPost({ params: Promise.resolve({ slug: 'test-slug' }) });
        const { container } = render(ResolvedBlogPost);

        const scriptTag = container.querySelector('script[type="application/ld+json"]');
        expect(scriptTag).not.toBeNull();

        const scriptContent = scriptTag?.innerHTML || '';

        // Check that raw '<', '>', and '&' are escaped to unicode equivalents
        expect(scriptContent).not.toContain('</script>');
        expect(scriptContent).not.toContain('<script>');
        expect(scriptContent).toContain('\\u003c/script\\u003e');
        expect(scriptContent).toContain('\\u003cscript\\u003e');
        expect(scriptContent).toContain('\\u0026');
    });
});
