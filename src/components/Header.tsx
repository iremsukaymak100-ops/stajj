import Link from 'next/link';
import { Compass, ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--accent)', padding: '0.5rem', borderRadius: '6px', color: 'white' }}>
            <Compass size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>
            Mantık<span style={{ color: 'var(--accent)', fontWeight: 400 }}>Müzesi</span>
          </span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Link href="/#explore" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Keşfet
          </Link>
          <Link href="/#about" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Hakkımızda
          </Link>
          <Link href="/#contact" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            İletişim
          </Link>
          <Link href="/admin" className="btn-primary" style={{ fontSize: '0.85rem' }}>
            <ShieldCheck size={16} />
            Admin Girişi
          </Link>
        </nav>
      </div>
    </header>
  );
}
