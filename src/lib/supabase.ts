import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  if (process.env.NODE_ENV === 'production') {
    console.warn("Supabase keys are missing! Deployment will not function correctly.");
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Mechanism = {
  id: string;
  title: string;
  description: string;
  code_example: string;
  category: 'condition' | 'loop' | 'branch';
  created_at: string;
};
