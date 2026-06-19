import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const isMock = !process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder') ||
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === 'placeholder';

if (isMock) {
  if (typeof window !== 'undefined') {
    console.warn("Supabase keys are missing or placeholders! Using API Proxy & Local Storage Fallback.");
  }
}

export type Mechanism = {
  id: string;
  title: string;
  description: string;
  code_example: string;
  category: 'condition' | 'loop' | 'branch';
  created_at: string;
};

interface DBResponse<T> {
  data: T | null;
  error: Error | null;
}

class MockSupabaseQueryBuilder {
  private table: string;

  constructor(table: string) {
    this.table = table;
  }

  select() {
    return {
      order: (column: string, { ascending }: { ascending: boolean } = { ascending: true }) => {
        const promise = fetch(`/api/db?table=${this.table}`)
          .then(res => res.json())
          .then(resData => {
            const data = (resData.data || []) as Record<string, unknown>[];
            data.sort((a, b) => {
              const valA = String(a[column] || '');
              const valB = String(b[column] || '');
              if (valA < valB) return ascending ? -1 : 1;
              if (valA > valB) return ascending ? 1 : -1;
              return 0;
            });
            return { data, error: null } as DBResponse<Record<string, unknown>[]>;
          })
          .catch(err => {
            console.error('API Fetch failed, using localStorage fallback', err);
            const localData = localStorage.getItem(`mock_${this.table}`);
            const data = (localData ? JSON.parse(localData) : []) as Record<string, unknown>[];
            return { data, error: null } as DBResponse<Record<string, unknown>[]>;
          });
        return promise;
      },
      then: (resolve: (value: DBResponse<Record<string, unknown>[]>) => void) => {
        fetch(`/api/db?table=${this.table}`)
          .then(res => res.json())
          .then(resData => resolve({ data: (resData.data || []) as Record<string, unknown>[], error: null }))
          .catch(err => {
            console.error('API Fetch failed, using localStorage fallback', err);
            const localData = localStorage.getItem(`mock_${this.table}`);
            const data = (localData ? JSON.parse(localData) : []) as Record<string, unknown>[];
            resolve({ data, error: null });
          });
      }
    };
  }

  insert(values: Record<string, unknown>[]) {
    return fetch(`/api/db?table=${this.table}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values[0])
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.error) throw new Error(resData.error);
        return { data: resData.data as Record<string, unknown>[], error: null } as DBResponse<Record<string, unknown>[]>;
      })
      .catch(err => {
        console.error('API Insert failed, using localStorage fallback', err);
        const localKey = `mock_${this.table}`;
        const localData = localStorage.getItem(localKey);
        const data = (localData ? JSON.parse(localData) : []) as Record<string, unknown>[];
        const newItem = {
          id: Math.random().toString(36).substring(2, 9),
          created_at: new Date().toISOString(),
          ...values[0]
        };
        localStorage.setItem(localKey, JSON.stringify([newItem, ...data]));
        return { data: [newItem], error: null } as DBResponse<Record<string, unknown>[]>;
      });
  }

  delete() {
    return {
      eq: (column: string, value: string | number) => {
        if (column === 'id') {
          return fetch(`/api/db?table=${this.table}&id=${value}`, {
            method: 'DELETE'
          })
            .then(res => res.json())
            .then(resData => {
              if (resData.error) throw new Error(resData.error);
              return { error: null } as { error: Error | null };
            })
            .catch(err => {
              console.error('API Delete failed, using localStorage fallback', err);
              const localKey = `mock_${this.table}`;
              const localData = localStorage.getItem(localKey);
              if (localData) {
                const data = JSON.parse(localData) as Record<string, unknown>[];
                const filtered = data.filter((item) => item.id !== value);
                localStorage.setItem(localKey, JSON.stringify(filtered));
              }
              return { error: null } as { error: Error | null };
            });
        }
        return Promise.resolve({ error: null } as { error: Error | null });
      }
    };
  }
}

const mockSupabase = {
  from(table: string) {
    return new MockSupabaseQueryBuilder(table);
  }
};

export const supabase = isMock 
  ? (mockSupabase as unknown as ReturnType<typeof createClient>) 
  : createClient(supabaseUrl, supabaseAnonKey);
