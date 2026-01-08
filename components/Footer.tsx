
import Link from "next/link";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t border-white/10 bg-black py-12">
            <div className="mx-auto max-w-7xl px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Ramu Narlapati. All rights reserved.
                </p>
                <div className="flex items-center gap-6">
                    <Link
                        href="https://github.com/ramunarlapati-13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors"
                    >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                    </Link>
                    <Link
                        href="https://linkedin.com/in/ramunarlapati"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-blue-400 transition-colors"
                    >
                        <Linkedin className="h-5 w-5" />
                        <span className="sr-only">LinkedIn</span>
                    </Link>
                    <Link
                        href="https://www.instagram.com/ramu_20__/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-pink-400 transition-colors"
                    >
                        <Instagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </Link>
                    <Link
                        href="https://api.whatsapp.com/send?phone=919912962427&text=%F0%9F%98%8A%20Hey%2C%20I%20have%20recently%20saw%20your%20portfolio%2C%20lets%20get%20in%20touch%20%F0%9F%A4%9D"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-green-400 transition-colors"
                    >
                        <MessageCircle className="h-5 w-5" />
                        <span className="sr-only">WhatsApp</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
