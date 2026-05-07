# Ramu Blogs

A modern personal blog website about **technology, energy, and design** — built with Next.js 16 and the App Router. Explore engineering insights, innovation stories, and hands-on project walkthroughs.

🌐 **Live site:** [ramublogs.vercel.app](https://ramublogs.vercel.app)

---

## 📖 Project Overview

**Ramu Blogs** is a personal blog platform authored by Ramu Narlapati. The site covers topics ranging from embedded systems and IoT projects to solar energy and modern web development. It is designed with a dark, minimalist aesthetic and focuses on a smooth, engaging reading experience.

---

## ✨ Features

- **Blog Listing Page** — Responsive card grid displaying all posts sorted by date, with category tags, publish date, and estimated read time.
- **Individual Blog Post Pages** — Rich, structured content with headings, code blocks, images, and more.
- **Dark Mode UI** — Elegant dark theme with subtle purple/indigo gradient accents throughout.
- **Smooth Animations** — Page and element entrance animations powered by Framer Motion.
- **Spotlight Cursor Effect** — Custom interactive cursor highlight for an immersive experience.
- **SEO Optimised** — Full metadata support including Open Graph, Twitter Cards, `sitemap.xml`, and `robots.txt`.
- **PWA Ready** — Web App Manifest for installability on mobile and desktop.
- **Social Sharing** — Built-in share buttons on every blog post.
- **Image Protection** — Client-side guard to discourage unauthorized image downloads.
- **Firebase Integration** — Backend support via Firebase for dynamic features.
- **Deployed on Vercel** — Zero-config CI/CD with automatic preview deployments.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS styling |
| [Framer Motion](https://www.framer-motion.com/) | Animations and transitions |
| [Lucide React](https://lucide.dev/) | Icon library |
| [Firebase](https://firebase.google.com/) | Backend / database integration |
| [Vercel](https://vercel.com/) | Hosting and deployment |

---

## 📁 Project Structure

```
ramu_blogs/
├── app/                        # Next.js App Router
│   ├── blogs/                  # Blog routes
│   │   ├── [slug]/             # Dynamic blog post page
│   │   ├── mastering-stm32-boards/   # Static blog: STM32 guide
│   │   └── solar-tracker-esp8266/    # Static blog: Solar tracker project
│   ├── globals.css             # Global styles
│   ├── icon.png                # Favicon
│   ├── layout.tsx              # Root layout (Navbar, Footer, fonts)
│   ├── manifest.ts             # PWA manifest
│   ├── page.tsx                # Home page (blog listing)
│   ├── robots.ts               # robots.txt configuration
│   └── sitemap.ts              # Sitemap generation
├── components/                 # Reusable React components
│   ├── ui/
│   │   └── spotlight-cursor.tsx  # Interactive spotlight cursor effect
│   ├── Footer.tsx              # Site footer
│   ├── ImageProtection.tsx     # Image download protection
│   ├── Navbar.tsx              # Navigation bar
│   └── ShareButtons.tsx        # Social media share buttons
├── lib/                        # Utilities and data
│   ├── data.ts                 # Blog content and metadata
│   └── firebase.ts             # Firebase configuration
├── public/                     # Static assets (images, icons)
├── stm32/                      # Additional STM32-related content
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config (inline)    # Tailwind CSS (via PostCSS plugin)
├── tsconfig.json               # TypeScript configuration
└── vercel.json                 # Vercel deployment configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm (comes with Node.js)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ramunarlapati-13/ramu_blogs.git
   cd ramu_blogs
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables** *(optional — required for Firebase features)*:

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   # Add your Firebase config keys here if needed
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build the app for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint checks |

---

## ☁️ Deployment

This project is deployed on **Vercel**. Every push to the main branch triggers an automatic production deployment.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ramunarlapati-13/ramu_blogs)

---

## 📄 License

This project is personal and all content is authored by **Ramu Narlapati**. Feel free to use the code structure as a reference for your own blog.
