import { getPostData, getSortedPostsData } from "@/lib/posts";
import { format, parseISO } from "date-fns";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const post = getPostData(slug);

  return (
    <article className="max-w-2xl mx-auto mt-8 px-6 md:px-0">
      <Link href="/" className="text-sm uppercase tracking-widest font-bold mb-8 block hover:underline">
        ← Back to Front Page
      </Link>
      
      <header className="mb-8 text-center">
        <div className="text-xs font-bold uppercase tracking-widest text-ink-500 mb-2">
          {post.meta.category} • {format(parseISO(post.meta.date), "MMMM do, yyyy")}
        </div>
        <h1 className="text-5xl md:text-6xl font-display font-black leading-tight mb-4">
          {post.meta.title}
        </h1>
        <div className="w-24 h-1 bg-ink-900 mx-auto my-6"></div>
      </header>

      {post.meta.image && (
        <div className="magic-frame max-w-full mx-auto mb-10">
          <img 
            src={post.meta.image} 
            alt={post.meta.title}
            className="magic-photo"
          />
          <div className="magic-grain"></div>
        </div>
      )}

      <div className="prose prose-ink prose-lg font-serif mx-auto first-letter:text-5xl first-letter:font-display first-letter:font-bold first-letter:mr-3 first-letter:float-left">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
