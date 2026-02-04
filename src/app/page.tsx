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
          <span>Vol. I</span>
          <div className="flex items-center gap-2">
            <span>Owl Post</span>
            <ThemeToggle />
          </div>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter text-center uppercase leading-none mb-2">
          The Ratcave
        </h1>
        <div className="w-full border-t border-b border-ink-900 py-1 text-center font-bold uppercase tracking-widest text-sm">
          {today}
        </div>
      </header>

      {/* Hero / Latest Post */}
      {posts.length > 0 && (
        <section className="mb-8">
          <Link href={`/blog/${posts[0].slug}`} className="group">
            <div className="relative border border-ink-900 p-2 bg-paper transition-transform group-hover:scale-[1.01] duration-500 ease-out">
              <div className="absolute top-0 left-0 bg-ink-900 text-paper px-2 py-1 text-xs font-bold uppercase z-10">
                Breaking News
              </div>
              <div className="h-64 bg-ink-200 w-full mb-4 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                {/* Placeholder for "Moving Image" */}
                <div className="w-full h-full flex items-center justify-center text-ink-500 font-display italic text-2xl">
                  [ Moving Image Spell Cast Here ]
                </div>
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
