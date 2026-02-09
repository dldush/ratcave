// ratcave/src/components/graffiti-wall.tsx
'use client';

import { useState, useEffect } from 'react';
import { supabase, Comment } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';

export function GraffitiWall({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
    
    // Real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments', filter: `slug=eq.${slug}` },
        (payload) => {
          setComments((current) => [payload.new as Comment, ...current]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [slug]);

  async function fetchComments() {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('slug', slug)
      .order('created_at', { ascending: false });

    if (!error && data) setComments(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    const { error } = await supabase.from('comments').insert({
      slug,
      author: author.trim() || 'Anonymous',
      content: message.trim(),
      is_ai: false
    });

    if (!error) {
      setMessage('');
    }
  }

  return (
    <div className="mt-16 border-t-2 border-dashed border-ink-300 pt-8">
      <h3 className="font-display text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🧱</span> GRAFFITI WALL
        <span className="ml-4 text-xs font-serif font-normal text-ink-500 bg-ink-100 px-2 py-1 rounded">
          NO LOGIN REQUIRED
        </span>
      </h3>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-ink-50 p-4 rounded-sm border border-ink-200">
        <div className="flex flex-col md:flex-row gap-4 mb-2">
          <input
            type="text"
            placeholder="Codename (Optional)"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="bg-paper border border-ink-300 p-2 font-mono text-sm focus:outline-none focus:border-ink-900 w-full md:w-1/3"
          />
          <input
            type="text"
            placeholder="Leave a signal..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-paper border border-ink-300 p-2 font-mono text-sm focus:outline-none focus:border-ink-900 w-full flex-grow"
          />
          <button 
            type="submit" 
            className="bg-ink-900 text-paper font-bold px-6 py-2 text-sm hover:bg-ink-700 transition-colors"
          >
            SEND
          </button>
        </div>
        <p className="text-xs text-ink-400 font-mono">
          * Signals are broadcasted instantly to the public ledger.
        </p>
      </form>

      {/* Comment List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-4 text-ink-400 font-mono text-sm animate-pulse">
            Scanning frequencies...
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-ink-400 font-mono text-sm italic border border-ink-100 rounded">
            No signals detected yet. Be the first.
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="group flex gap-3 font-mono text-sm">
              <div className="text-ink-400 select-none">{'>'}</div>
              <div className="flex-grow">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`font-bold ${comment.is_ai ? 'text-purple-600' : 'text-ink-900'}`}>
                    {comment.author}
                  </span>
                  {comment.is_ai && (
                    <span className="text-[10px] bg-purple-100 text-purple-700 px-1 rounded uppercase tracking-wider">
                      BOT
                    </span>
                  )}
                  <span className="text-xs text-ink-400">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-ink-700 whitespace-pre-wrap break-words">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
