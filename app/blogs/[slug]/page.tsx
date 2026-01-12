
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_CONTENT } from "@/lib/data";

interface PostContent {
    type: string;
    text?: string;
    items?: string[];
}

const ARDUINO_CODE_BG = `void setup() {
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  digitalWrite(LED_BUILTIN, HIGH);
  delay(1000);
  digitalWrite(LED_BUILTIN, LOW);
  delay(1000);
}`;

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = BLOG_CONTENT[slug as keyof typeof BLOG_CONTENT];

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-black text-white pb-20 relative overflow-hidden">
            {/* Background Code Effect for Arduino Blog */}
            {slug === 'getting-started-with-arduino-uno' && (
                <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03] select-none overflow-hidden">
                    <pre className="text-6xl md:text-8xl font-black font-mono text-white whitespace-pre-wrap text-center rotate-[-12deg] scale-150 transform transition-transform duration-[20s] ease-linear">
                        {ARDUINO_CODE_BG}
                    </pre>
                </div>
            )}

            {/* Hero Header */}
            <div className="relative h-[60vh] w-full overflow-hidden z-10">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                <img
                    src={post.heroImage}
                    alt={post.title}
                    className="h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 z-20 mx-auto max-w-3xl px-6 pb-12">
                    <Link
                        href="/blogs"
                        className="mb-6 inline-flex items-center text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                    >
                        ← Back to Blogs
                    </Link>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-400 backdrop-blur-sm border border-indigo-500/10">
                            {post.category}
                        </span>
                        <span className="text-zinc-300 text-sm">{post.date}</span>
                        <span className="text-zinc-500">•</span>
                        <span className="text-zinc-300 text-sm">{post.readTime}</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight">
                        {post.title}
                    </h1>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mx-auto max-w-3xl px-6 pt-12">
                <div className="flex items-center gap-4 mb-12 border-b border-zinc-800 pb-8">
                    <div className="h-12 w-12 rounded-full overflow-hidden bg-zinc-800">
                        <img src={post.author.avatar} alt={post.author.name} />
                    </div>
                    <div>
                        <div className="font-medium text-white">{post.author.name}</div>
                        <div className="text-sm text-zinc-500">Author</div>
                    </div>
                </div>

                <div className="space-y-8 text-lg leading-relaxed text-zinc-300">
                    {post.content.map((block: PostContent, index: number) => {
                        if (block.type === 'paragraph') {
                            return <p key={index}>{block.text}</p>;
                        }
                        if (block.type === 'heading') {
                            return (
                                <h2 key={index} className="text-2xl font-bold text-white pt-4">
                                    {block.text}
                                </h2>
                            );
                        }
                        if (block.type === 'list' && block.items) {
                            return (
                                <ul key={index} className="list-disc pl-6 space-y-2">
                                    {block.items.map((item, i) => (
                                        <li key={i}>{item}</li>
                                    ))}
                                </ul>
                            );
                        }
                        if (block.type === 'code') {
                            return (
                                <pre key={index} className="bg-zinc-900 border border-zinc-800 rounded-lg p-4 overflow-x-auto text-sm font-mono text-zinc-100">
                                    <code>{block.text}</code>
                                </pre>
                            );
                        }
                        return null;
                    })}
                </div>
            </div>
        </article>
    );
}
