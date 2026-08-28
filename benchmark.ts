import { BLOG_CONTENT } from "./lib/data";

const iterations = 100000;

console.time("Baseline");
for (let i = 0; i < iterations; i++) {
  const blogs = Object.entries(BLOG_CONTENT).sort(([, a], [, b]) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
console.timeEnd("Baseline");
