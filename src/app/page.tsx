import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { format } from "date-fns";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const posts = getSortedPostsData();
  const today = format(new Date(), "EEEE, MMMM do, yyyy");

  return (
    <main className="flex flex-col gap-8">
      {/* Header Section */}
      <header className="flex flex-col items-center border-b-4 border-ink-900 pb-4 mb-4 relative">
        <div className="w-full flex justify-between items-center border-b border-ink-900 mb-2 py-1 text-xs uppercase tracking-widest font-bold">
          <span>ARCHIVE 0</span>
          <ThemeToggle />
        </div>
        <h1 className="text-5xl md:text-8xl font-display font-black tracking-tighter text-center uppercase leading-none mb-2">
          Ratcave: Archive 0
        </h1>
        <div className="w-full border-t border-b border-ink-900 py-1 text-center font-bold uppercase tracking-widest text-sm">
          {today} • <span className="glitch text-red-600 dark:text-red-400" data-text="SYSTEM ONLINE">SYSTEM ONLINE</span>
        </div>
      </header>

      {/* Hero / Latest Post */}
      {posts.length > 0 && (
        <section className="mb-8">
          <Link href={`/blog/${posts[0].slug}`} className="group">
            <div className="relative border border-ink-900 p-2 bg-paper transition-transform group-hover:scale-[1.01] duration-500 ease-out">
              <div className="absolute top-0 left-0 bg-ink-900 text-paper px-2 py-1 text-xs font-bold uppercase z-10">
                INCOMING SIGNAL
              </div>
              <div className="h-64 bg-ink-200 w-full mb-4 overflow-hidden relative">
                {posts[0].meta.image ? (
                  <>
                    <img 
                      src={posts[0].meta.image} 
                      alt={posts[0].meta.title}
                      className="w-full h-full object-cover grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48ZmlsdGVyIGlkPSJnoiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2cpIiBvcGFjaXR5PSIwLjUiLz48L3N2Zz4=')]"></div>
                  </>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-ink-500 font-display italic text-2xl">
                    [ No Image ]
                  </div>
                )}
              </div>
              <h2 className="text-4xl font-display font-bold mb-2 group-hover:underline decoration-2 underline-offset-4">
                {posts[0].meta.title}
              </h2>
              <p className="font-serif text-lg leading-relaxed text-ink-700 line-clamp-3">
                {posts[0].meta.excerpt}
              </p>
            </div>
          </Link>
        </section>
      )}

      {/* Grid Layout for Older Posts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t-2 border-ink-900 pt-6">
        {posts.slice(1).map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className="group">
            <article className="flex flex-col h-full border-r last:border-r-0 md:border-r border-ink-200 pr-4">
              <span className="text-xs font-bold uppercase text-ink-500 mb-1 tracking-wider">
                {post.meta.category}
              </span>
              <h3 className="text-2xl font-display font-bold mb-2 group-hover:text-ink-600 transition-colors">
                {post.meta.title}
              </h3>
              <p className="text-sm text-ink-600 line-clamp-4 flex-grow font-serif">
                {post.meta.excerpt}
              </p>
              <div className="mt-4 text-xs italic text-ink-400">
                Read more →
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
