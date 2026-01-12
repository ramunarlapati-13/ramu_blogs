

"use client";

import { motion } from "framer-motion";
import { BLOG_CONTENT } from "@/lib/data";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export default function Home() {
  // Convert the object to an array of [slug, data] pairs
  const blogs = Object.entries(BLOG_CONTENT).sort(([, a], [, b]) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-purple-500/30">
      {/* Background gradients */}
      <div className="fixed top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-purple-900/20 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-indigo-900/20 blur-[100px] pointer-events-none" />

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-24"
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent mb-6">
            Ramu Blogs
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
            className="h-1 w-24 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {blogs.map(([slug, blog], index) => (
            <motion.div
              key={slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <Link href={`/blogs/${slug}`} className="group block h-full">
                <div className="relative h-full bg-zinc-900/50 border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-colors duration-500 backdrop-blur-sm flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/9] w-full overflow-hidden">
                    <img
                      src={blog.heroImage}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-zinc-400 mb-4">
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white">
                        {blog.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Calendar size={12} />
                        {blog.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        {blog.readTime}
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold mb-3 leading-tight group-hover:text-purple-400 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-zinc-400 line-clamp-3 text-sm mb-6 flex-grow">
                      {/* Get first paragraph safely */}
                      {Array.isArray(blog.content) ? blog.content.find((c: any) => c.type === 'paragraph')?.text : ''}
                    </p>

                    <div className="flex items-center text-sm font-semibold text-white group-hover:translate-x-1 transition-transform mt-auto">
                      Read Article <ArrowRight size={16} className="ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
