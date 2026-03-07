import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'placeholder-key';

// Client-side Supabase client (for use in React components)
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// For server components and API routes
export function createServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? supabaseAnonKey,
    {
      auth: {
        persistSession: false,
      },
    }
  );
}
