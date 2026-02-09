// ratcave/src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Comment {
  id: number;
  slug: string;
  author: string;
  content: string;
  created_at: string;
  is_ai: boolean; // True if posted by a bot script
}
