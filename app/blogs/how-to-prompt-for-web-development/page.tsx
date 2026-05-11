"use client";

import { useState, useEffect } from "react";
import { MessageSquareCode, Layers, Cpu, Shield, FileText } from "lucide-react";
import ShareButtons from "@/components/ShareButtons";

const sections = [
    { id: "overview", title: "Introduction", icon: FileText },
    { id: "how-to-prompt", title: "How to Prompt", icon: MessageSquareCode },
    { id: "elements", title: "Web Dev Elements", icon: Layers },
    { id: "ai-stack", title: "AI Development Stack", icon: Cpu },
    { id: "domains", title: "Specialized Domains", icon: Shield },
];

export default function WebDevPromptingBlogPage() {
    const [activeSection, setActiveSection] = useState("overview");
    const [isNavOpen, setIsNavOpen] = useState(false);
    const SHARE_URL = "https://ramublogs.vercel.app/blogs/how-to-prompt-for-web-development";

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section.id);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: "smooth",
            });
            setIsNavOpen(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-black via-zinc-900 to-black text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src="/images/web-dev-prompt-notes.png"
                    alt="Web Development Prompting"
                    className="absolute inset-0 h-full w-full object-cover opacity-40"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black"></div>
                <div className="relative mx-auto flex h-full max-w-4xl flex-col items-center justify-center px-6 text-center">
                    <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl lg:text-7xl">
                        AI-Augmented Engineering
                    </h1>
                    <p className="mb-6 text-xl text-zinc-300 md:text-2xl">
                        Effective Prompting & Core Elements of Web Development
                    </p>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                        <span>By Ramu Narlapati</span>
                        <span>•</span>
                        <span>May 11, 2026</span>
                        <span>•</span>
                        <span>12 min read</span>
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col lg:flex-row gap-12">
                {/* Left Sidebar Navigation */}
                <aside className="hidden lg:block w-64 shrink-0">
                    <div className="sticky top-24 space-y-2">
                        <div className="mb-4 text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                            Table of Contents
                        </div>
                        {sections.map((section) => {
                            const Icon = section.icon;
                            return (
                                <button
                                    key={section.id}
                                    onClick={() => scrollToSection(section.id)}
                                    className={`flex w-full items-center gap-3 rounded-md px-4 py-3 text-left transition-colors ${activeSection === section.id
                                        ? 'bg-indigo-600/20 text-indigo-400 border-l-2 border-indigo-400'
                                        : 'text-zinc-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                                        }`}
                                >
                                    <Icon className={`h-4 w-4 ${activeSection === section.id ? 'text-indigo-400' : 'text-zinc-500'}`} />
                                    <span className={`text-sm font-medium ${activeSection === section.id ? 'text-indigo-100' : ''}`}>
                                        {section.title}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-w-0">

                    <div className="mb-12">
                        <ShareButtons
                            url={SHARE_URL}
                            title="How to Prompt for Web Development: AI-Augmented Engineering"
                        />
                    </div>

                    {/* Overview Section */}
                    <section id="overview" className="mb-20 scroll-mt-32">
                        <div className="prose prose-invert max-w-none">
                            <p className="text-xl leading-relaxed text-zinc-300">
                                Effective prompting and understanding the core elements of web development are the two pillars of modern, AI-augmented engineering.
                            </p>
                        </div>
                    </section>

                    {/* How to Prompt Section */}
                    <section id="how-to-prompt" className="mb-20 scroll-mt-32">
                        <h2 className="mb-6 text-4xl font-bold">How to Prompt for Web Development</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Prompting is "natural language programming" where the clarity of your input determines the reliability of the output. Professional prompting typically follows structured frameworks and logic-based techniques:
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold">Prompting Frameworks</h3>
                            <ul className="space-y-4 text-zinc-300">
                                <li>
                                    <strong className="text-indigo-400">TCRTE:</strong> Task (what to do), Context (background), Role (persona like "Senior React Dev"), Tone (formal/concise), and Examples (expected output).
                                </li>
                                <li>
                                    <strong className="text-indigo-400">CRISP:</strong> Context, Role, Input, Steps, and Parameters (constraints like "use async/await").
                                </li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold">Core Techniques</h3>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                                    <h4 className="text-xl font-semibold text-indigo-400 mb-2">Zero-Shot</h4>
                                    <p className="text-zinc-300">Issuing a direct command without prior examples; best for general syntax or simple explanations.</p>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                                    <h4 className="text-xl font-semibold text-indigo-400 mb-2">Few-Shot</h4>
                                    <p className="text-zinc-300">Providing 2–3 examples of the desired code style or output format within the prompt to establish patterns.</p>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                                    <h4 className="text-xl font-semibold text-indigo-400 mb-2">Chain-of-Thought (CoT)</h4>
                                    <p className="text-zinc-300">Adding the instruction "Let's think step by step" or "reason through this carefully" to significantly improve the model's logical accuracy.</p>
                                </div>
                                <div className="rounded-lg border border-white/10 bg-white/5 p-6">
                                    <h4 className="text-xl font-semibold text-indigo-400 mb-2">Prompt Chaining</h4>
                                    <p className="text-zinc-300">Breaking a massive request into sequential, atomic tasks (e.g., first generating an API contract, then the database schema, then the implementation) to prevent logical drift.</p>
                                </div>
                            </div>
                            
                            <h3 className="mt-12 text-2xl font-semibold">Short Notes</h3>
                            <div className="my-8">
                                <img src="/images/web-dev-prompt-notes.png" alt="Short notes for web development prompting" className="w-full rounded-xl border border-white/10 shadow-2xl" />
                            </div>
                        </div>
                    </section>

                    {/* Elements of Web Dev Section */}
                    <section id="elements" className="mb-20 scroll-mt-32">
                        <h2 className="mb-6 text-4xl font-bold">The Elements of Web Development</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300">
                                Web development in 2025 is categorized into three primary layers, supported by specific tools and specialized practices:
                            </p>

                            <h3 className="mt-8 text-2xl font-semibold text-indigo-300 border-b border-white/10 pb-2">Frontend (Client-Side)</h3>
                            <p className="text-zinc-400 mb-4 italic">The visual and interactive layer.</p>
                            <ul className="space-y-2 text-zinc-300">
                                <li><strong className="text-indigo-400">Core Tech:</strong> HTML (structure), CSS (styling, often utility-first like Tailwind), and JavaScript (behavior).</li>
                                <li><strong className="text-indigo-400">Frameworks:</strong> Libraries like React, which manage components and state (using tools like Zustand or TanStack Query).</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold text-indigo-300 border-b border-white/10 pb-2">Backend (Server-Side)</h3>
                            <p className="text-zinc-400 mb-4 italic">The logic and data orchestration layer.</p>
                            <ul className="space-y-2 text-zinc-300">
                                <li><strong className="text-indigo-400">Languages:</strong> Node.js, Python, or Go are common for building servers.</li>
                                <li><strong className="text-indigo-400">Data:</strong> Designing databases (SQL like PostgreSQL or NoSQL like MongoDB) and API architectures (REST or GraphQL).</li>
                            </ul>

                            <h3 className="mt-8 text-2xl font-semibold text-indigo-300 border-b border-white/10 pb-2">Full Stack Integration</h3>
                            <p className="text-zinc-300 mt-4">
                                The combination of frontend and backend, including testing (unit/integration) and version control via Git.
                            </p>
                        </div>
                    </section>

                    {/* AI Stack Section */}
                    <section id="ai-stack" className="mb-20 scroll-mt-32">
                        <h2 className="mb-6 text-4xl font-bold">The AI Development Stack</h2>
                        <div className="prose prose-invert max-w-none">
                            <p className="text-lg text-zinc-300 mb-6">
                                Professional environments now integrate AI directly into the lifecycle:
                            </p>

                            <div className="flex flex-col gap-6">
                                <div className="flex gap-4 items-start bg-white/5 p-6 rounded-xl border border-white/10">
                                    <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">
                                        <MessageSquareCode className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">Assistants</h4>
                                        <p className="text-zinc-300">GitHub Copilot or Claude for code suggestions and boilerplate.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-start bg-white/5 p-6 rounded-xl border border-white/10">
                                    <div className="bg-indigo-500/20 p-3 rounded-lg text-indigo-400">
                                        <Cpu className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-white mb-2">AI IDEs</h4>
                                        <p className="text-zinc-300">Specialized editors like Cursor that maintain codebase-wide context for deep refactoring.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                    {/* Domains Section */}
                    <section id="domains" className="mb-20 scroll-mt-32">
                        <h2 className="mb-6 text-4xl font-bold">Specialized Domains</h2>
                        <div className="prose prose-invert max-w-none">
                            <ul className="space-y-6 text-zinc-300">
                                <li className="bg-zinc-900/50 p-6 rounded-lg border-l-4 border-indigo-500">
                                    <strong className="text-indigo-400 text-xl block mb-2">Accessibility (A11y)</strong>
                                    Ensuring sites work for screen readers and users with disabilities.
                                </li>
                                <li className="bg-zinc-900/50 p-6 rounded-lg border-l-4 border-indigo-500">
                                    <strong className="text-indigo-400 text-xl block mb-2">Security</strong>
                                    Sanitizing inputs, managing authentication, and conducting AI-assisted vulnerability scans.
                                </li>
                                <li className="bg-zinc-900/50 p-6 rounded-lg border-l-4 border-indigo-500">
                                    <strong className="text-indigo-400 text-xl block mb-2">DevOps/CI/CD</strong>
                                    Automating the "ship-to-production" pipeline using GitHub Actions, Docker, and platforms like Vercel.
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Share Again */}
                    <div className="mb-12">
                        <ShareButtons
                            url={SHARE_URL}
                            title="How to Prompt for Web Development: AI-Augmented Engineering"
                        />
                    </div>

                </main>
            </div>
        </div>
    );
}
