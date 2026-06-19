'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle2, AlertCircle, User, Mail, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }]);

    setLoading(false);
    if (error) {
      console.error(error);
      setStatus('error');
    } else {
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="section-padding" style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Bize Yazın</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            Programlama mantığı veya portal hakkındaki düşüncelerinizi, önerilerinizi merak ediyoruz.
          </p>
        </div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="glass"
          style={{ 
            padding: '4rem', 
            borderRadius: 'var(--radius)', 
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            background: 'white',
            boxShadow: 'var(--shadow-lg)'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={14} /> AD SOYAD
              </label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Örn: İrem Su"
                style={{ 
                  padding: '1.25rem', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
                className="input-focus"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} /> E-POSTA
              </label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Örn: iremsu@example.com"
                style={{ 
                  padding: '1.25rem', 
                  border: '1px solid var(--border)', 
                  borderRadius: 'var(--radius)',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'var(--transition)'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MessageSquare size={14} /> MESAJINIZ
            </label>
            <textarea 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Fikirlerinizi buraya yazın..."
              style={{ 
                padding: '1.25rem', 
                border: '1px solid var(--border)', 
                borderRadius: 'var(--radius)',
                minHeight: '180px',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                transition: 'var(--transition)'
              }}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={loading}
            style={{ padding: '1.25rem', justifyContent: 'center', fontSize: '1rem' }}
          >
            {loading ? 'İletiliyor...' : (
              <>
                Gönder <Send size={18} />
              </>
            )}
          </button>

          <AnimatePresence>
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ 
                  background: 'var(--accent-light)', 
                  color: 'var(--accent)', 
                  padding: '1.25rem', 
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontWeight: 600
                }}
              >
                <CheckCircle2 size={20} /> Mesajınız başarıyla iletildi. Teşekkürler!
              </motion.div>
            )}

            {status === 'error' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ 
                  background: '#fef2f2', 
                  color: '#991b1b', 
                  padding: '1.25rem', 
                  borderRadius: 'var(--radius)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontWeight: 600
                }}
              >
                <AlertCircle size={20} /> Bir hata oluştu. Lütfen tekrar deneyin.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}
