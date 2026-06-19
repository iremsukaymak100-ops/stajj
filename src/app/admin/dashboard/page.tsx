'use client';

import { useEffect, useState, useCallback } from 'react';
import Header from '@/components/Header';
import { supabase, Mechanism } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Database, 
  Mail, 
  Trash2, 
  LogOut, 
  Code2, 
  Type, 
  AlignLeft, 
  Layers, 
  Trash,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [mechanisms, setMechanisms] = useState<Mechanism[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin_auth') === 'true';
    }
    return false;
  });
  
  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [category, setCategory] = useState<'condition' | 'loop' | 'branch'>('condition');
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'mechanisms' | 'messages'>('mechanisms');
  const [messages, setMessages] = useState<{
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }[]>([]);

  const router = useRouter();

  const fetchMechanisms = useCallback(async () => {
    const { data, error } = await supabase
      .from('programming_logic_items')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setMechanisms(data);
    setLoading(false);
  }, []);

  const fetchMessages = useCallback(async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error && data) setMessages(data);
  }, []);

  useEffect(() => {
    if (!authorized) {
      router.push('/admin');
    } else {
      const timer = setTimeout(() => {
        fetchMechanisms();
        fetchMessages();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [router, authorized, fetchMechanisms, fetchMessages]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setAuthorized(false);
    router.push('/admin');
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase
      .from('programming_logic_items')
      .insert([{ title, description, code_example: code, category }]);
    
    if (error) {
      alert('Hata: ' + error.message);
    } else {
      setTitle('');
      setDescription('');
      setCode('');
      fetchMechanisms();
    }
  }

  async function handleDeleteMechanism(id: string) {
    if (!confirm('Bu mekanizmayı silmek istediğinize emin misiniz?')) return;
    const { error } = await supabase
      .from('programming_logic_items')
      .delete()
      .eq('id', id);
    
    if (error) alert('Hata: ' + error.message);
    else fetchMechanisms();
  }

  async function handleDeleteMessage(id: string) {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      alert('Hata: Silme yetkiniz olmayabilir veya bir sorun oluştu. (' + error.message + ')');
    } else {
      fetchMessages();
    }
  }

  if (!authorized) return null;

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Header />
      <div className="container" style={{ padding: '6rem 0' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '4rem',
          background: 'white',
          padding: '2rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Kontrol Paneli</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '0.5rem 0 0' }}>Hoş geldin, İrem Su</p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-secondary)', padding: '0.5rem', borderRadius: '100px' }}>
            <button 
              onClick={() => setActiveTab('mechanisms')}
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                background: activeTab === 'mechanisms' ? 'white' : 'transparent',
                color: activeTab === 'mechanisms' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: activeTab === 'mechanisms' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Database size={16} /> Mekanizmalar
            </button>
            <button 
              onClick={() => setActiveTab('messages')}
              style={{ 
                padding: '0.75rem 1.5rem', 
                borderRadius: '100px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                fontWeight: 600,
                background: activeTab === 'messages' ? 'white' : 'transparent',
                color: activeTab === 'messages' ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: activeTab === 'messages' ? 'var(--shadow-sm)' : 'none',
                transition: 'var(--transition)'
              }}
            >
              <Mail size={16} /> Mesajlar
            </button>
          </div>

          <button onClick={handleLogout} className="btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem' }}>
            <LogOut size={16} /> Çıkış
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'mechanisms' ? (
            <motion.div 
              key="mechanisms"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '3rem' }}
            >
              {/* Add Form */}
              <section>
                <form onSubmit={handleSubmit} className="glass" style={{ 
                  padding: '2.5rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '1.5rem', 
                  border: '1px solid var(--border)',
                  background: 'white',
                  borderRadius: 'var(--radius)',
                  boxShadow: 'var(--shadow-md)',
                  position: 'sticky',
                  top: '100px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <div style={{ background: 'var(--accent-light)', color: 'var(--accent)', padding: '0.5rem', borderRadius: '6px' }}>
                      <Plus size={20} />
                    </div>
                    <h3 style={{ margin: 0 }}>Yeni Mekanizma</h3>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Type size={14} /> Başlık
                    </label>
                    <input 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                      required 
                      placeholder="Örn: For In Döngüsü"
                      style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <AlignLeft size={14} /> Açıklama
                    </label>
                    <textarea 
                      value={description} 
                      onChange={e => setDescription(e.target.value)} 
                      required 
                      placeholder="Mekanizmanın işlevini kısaca anlatın..."
                      style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', minHeight: '100px', outline: 'none', resize: 'vertical' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Code2 size={14} /> Kod Örneği
                    </label>
                    <textarea 
                      value={code} 
                      onChange={e => setCode(e.target.value)} 
                      required 
                      placeholder="console.log('Mantık Müzesi');"
                      style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', minHeight: '120px', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }} 
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Layers size={14} /> Kategori
                    </label>
                    <select 
                      value={category} 
                      onChange={e => setCategory(e.target.value as 'condition' | 'loop' | 'branch')} 
                      style={{ padding: '1rem', border: '1px solid var(--border)', borderRadius: '6px', outline: 'none', background: 'white' }}
                    >
                      <option value="condition">Karar (Condition)</option>
                      <option value="loop">Döngü (Loop)</option>
                      <option value="branch">Dallanma (Branch)</option>
                    </select>
                  </div>

                  <button type="submit" className="btn-primary" style={{ marginTop: '1rem', justifyContent: 'center' }}>
                    Kaydet ve Yayınla <CheckCircle2 size={18} />
                  </button>
                </form>
              </section>

              {/* List */}
              <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                  <Database size={24} className="text-accent" />
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>Mevcut Mekanizmalar</h2>
                </div>
                
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>Yükleniyor...</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {mechanisms.map((m: Mechanism) => (
                      <div key={m.id} className="glass" style={{ 
                        padding: '1.25rem 2rem', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        border: '1px solid var(--border)',
                        background: 'white',
                        borderRadius: 'var(--radius)',
                        boxShadow: 'var(--shadow-sm)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                          <span style={{ 
                            fontSize: '0.7rem', 
                            background: 'var(--bg-secondary)', 
                            padding: '0.3rem 0.7rem', 
                            borderRadius: '100px',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            color: 'var(--accent)'
                          }}>
                            {m.category}
                          </span>
                          <strong style={{ fontSize: '1.1rem' }}>{m.title}</strong>
                        </div>
                        <button 
                          onClick={() => handleDeleteMechanism(m.id)}
                          style={{ 
                            color: '#ef4444', 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem', 
                            fontSize: '0.85rem', 
                            fontWeight: 600,
                            padding: '0.5rem',
                            borderRadius: '6px',
                            transition: 'var(--transition)'
                          }}
                          className="btn-outline"
                        >
                          <Trash2 size={16} /> Sil
                        </button>
                      </div>
                    ))}
                    {mechanisms.length === 0 && (
                      <p style={{ textAlign: 'center', padding: '4rem', opacity: 0.5 }}>Henüz bir içerik eklenmemiş.</p>
                    )}
                  </div>
                )}
              </section>
            </motion.div>
          ) : (
            <motion.div 
              key="messages"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={24} className="text-accent" />
                  <h2 style={{ fontSize: '2rem', margin: 0 }}>Gelen Mesajlar</h2>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  Toplam Mesaj: <strong>{messages.length}</strong>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {messages.length > 0 ? messages.map((msg) => (
                  <div key={msg.id} className="glass" style={{ 
                    padding: '2.5rem', 
                    border: '1px solid var(--border)',
                    background: 'white',
                    borderRadius: 'var(--radius)',
                    boxShadow: 'var(--shadow-md)',
                    position: 'relative'
                  }}>
                    <button 
                      onClick={() => handleDeleteMessage(msg.id)}
                      style={{ position: 'absolute', top: '2rem', right: '2rem', color: '#ef4444', padding: '0.5rem', borderRadius: '50%' }}
                      className="btn-outline"
                      title="Mesajı Sil"
                    >
                      <Trash size={18} />
                    </button>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent-light)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.2rem' }}>
                          {msg.name[0].toUpperCase()}
                        </div>
                        <div>
                          <h4 style={{ margin: 0, fontSize: '1.25rem' }}>{msg.name}</h4>
                          <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                            <Mail size={12} /> {msg.email}
                          </span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-secondary)', opacity: 0.7 }}>
                        <Clock size={12} /> {new Date(msg.created_at).toLocaleString('tr-TR')}
                      </div>
                    </div>
                    
                    <p style={{ 
                      whiteSpace: 'pre-wrap', 
                      background: 'var(--bg-secondary)', 
                      padding: '1.5rem', 
                      borderRadius: '8px', 
                      color: 'var(--text-primary)',
                      lineHeight: 1.6
                    }}>
                      {msg.message}
                    </p>
                  </div>
                )) : (
                  <div style={{ textAlign: 'center', opacity: 0.6, padding: '8rem', background: 'white', borderRadius: 'var(--radius)', border: '1px dotted var(--border)' }}>
                    <Mail size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                    <p>Henüz mesaj bulunmuyor.</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
