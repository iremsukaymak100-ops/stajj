'use client';

import { useEffect, useState } from 'react';
import MechanismCard from '@/components/MechanismCard';
import { isMock, Mechanism } from '@/lib/supabase';

interface Props {
  initialMechanisms: Mechanism[];
}

export default function ClientMechanismList({ initialMechanisms }: Props) {
  const [mechanisms, setMechanisms] = useState<Mechanism[]>(initialMechanisms);

  useEffect(() => {
    if (isMock) {
      const loadLocalMechanisms = () => {
        const stored = localStorage.getItem('mock_programming_logic_items');
        if (stored) {
          try {
            setMechanisms(JSON.parse(stored));
          } catch (e) {
            console.error('Error parsing mock_programming_logic_items from localStorage:', e);
          }
        }
      };

      loadLocalMechanisms();

      // Listen for local changes (if we want realtime sync on same page or window focus)
      window.addEventListener('storage', loadLocalMechanisms);
      // Custom event for same-tab updates (e.g. from admin panel if on same page context)
      window.addEventListener('mock-db-update', loadLocalMechanisms);

      return () => {
        window.removeEventListener('storage', loadLocalMechanisms);
        window.removeEventListener('mock-db-update', loadLocalMechanisms);
      };
    }
  }, []);

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
      gap: '2.5rem' 
    }}>
      {mechanisms.length > 0 ? (
        mechanisms.map((m) => (
          <MechanismCard key={m.id} mechanism={m} />
        ))
      ) : (
        <div style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '4rem' }}>
          <p>Henüz içerik eklenmemiş. Lütfen Admin panelinden ekleme yapın.</p>
        </div>
      )}
    </div>
  );
}
