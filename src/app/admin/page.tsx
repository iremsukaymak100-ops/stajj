'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { Lock, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulating a small delay for premium feel
    setTimeout(() => {
      if (password === 'irem123') {
        localStorage.setItem('admin_auth', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Geçersiz şifre. Lütfen tekrar deneyin.');
        setLoading(false);
      }
    }, 600);
  };

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <Header />
      <section style={{ height: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '440px' }}
        >
          <form 
            onSubmit={handleLogin}
            className="glass" 
            style={{ 
              padding: '4rem 3rem', 
              borderRadius: 'var(--radius)', 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '2rem',
              background: 'white',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border)'
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'var(--accent-light)', 
                color: 'var(--accent)', 
                width: '56px', 
                height: '56px', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem' 
              }}>
                <Lock size={24} />
              </div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Admin Paneli</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Devam etmek için yetkili girişi yapın.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '0.05em' }}>ŞİFRE</label>
              <div style={{ position: 'relative' }}>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (error) setError('');
                  }}
                  style={{ 
                    padding: '1.25rem', 
                    paddingRight: '3rem',
                    width: '100%',
                    borderRadius: 'var(--radius)', 
                    border: '1px solid var(--border)',
                    background: '#fafafa',
                    fontSize: '1rem',
                    transition: 'var(--transition)',
                    outline: 'none'
                  }} 
                  placeholder="Yönetici şifreniz"
                  required
                />
              </div>
            </div>

            {error && (
              <div style={{ 
                background: '#fef2f2', 
                color: '#991b1b', 
                padding: '1rem', 
                borderRadius: 'var(--radius)', 
                fontSize: '0.9rem', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                fontWeight: 500
              }}>
                <AlertCircle size={16} /> {error}
              </div>
            )}

            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
              style={{ padding: '1.25rem', justifyContent: 'center', fontSize: '1rem' }}
            >
              {loading ? 'Giriş Yapılıyor...' : (
                <>
                  Sisteme Gir <LogIn size={18} />
                </>
              )}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '2rem', opacity: 0.5, fontSize: '0.85rem' }}>
            Unuttuysanız lütfen sistem yöneticisi ile iletişime geçin.
          </div>
        </motion.div>
      </section>
    </main>
  );
}
