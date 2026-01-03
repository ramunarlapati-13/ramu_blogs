import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg"></div>
                    <span className="text-xl font-bold tracking-tight text-white">Ramu Blogs</span>
                </div>
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                        Home
                    </Link>
                    <Link href="https://ramu-blog.vercel.app/" className="text-sm font-medium text-zinc-400 transition-colors hover:text-white">
                        Blogs
                    </Link>
                </div>
            </div>
        </nav>
    );
}
