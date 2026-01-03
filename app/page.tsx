import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/40 blur-[100px]" />
      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-900/40 blur-[100px]" />

      <main className="z-10 flex flex-col items-center text-center px-4">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-br from-white to-zinc-500 bg-clip-text text-transparent mb-6">
          Ramu Blogs
        </h1>
        <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl mb-10">
          Exploring the frontiers of technology, energy, and design.
        </p>

        <div className="flex gap-4">
          <Link
            href="/blogs"
            className="px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
          >
            Read Articles
          </Link>
          <a // kept as anchor for external or just variant style
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
          >
            Github
          </a>
        </div>
      </main>
    </div>
  );
}
