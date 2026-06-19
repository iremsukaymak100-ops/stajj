export const dynamic = 'force-dynamic';
import { Suspense } from 'react';
import Header from '@/components/Header';
import MechanismCard from '@/components/MechanismCard';
import ContactForm from '@/components/ContactForm';
import { supabase, Mechanism } from '@/lib/supabase';
import { MousePointer2, Sparkles } from 'lucide-react';

async function getMechanisms() {
  const { data, error } = await supabase
    .from('programming_logic_items')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching mechanisms:', error);
    return [];
  }
  return data as Mechanism[];
}

export default async function Home() {
  return (
    <main className="bg-premium" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      {/* Hero Section */}
      <section className="section-padding" style={{ 
        position: 'relative', 
        overflow: 'hidden',
      }}>
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            background: 'white', 
            padding: '0.5rem 1rem', 
            borderRadius: '100px', 
            border: '1px solid var(--border)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '2rem',
            boxShadow: 'var(--shadow-sm)'
          }} className="animate-in">
            <Sparkles size={14} className="text-accent" />
            <span>Dijital Programlama Mantığı Arşivi</span>
          </div>
          
          <h1 style={{ 
            fontSize: '5rem', 
            marginBottom: '1.5rem', 
            lineHeight: 1,
          }} className="animate-in hero-text-shadow">
            Algoritmik <span className="text-gradient">Düşüncenin</span><br />
            <span style={{ fontStyle: 'italic', fontWeight: 300 }}>Sanatla Buluşması</span>
          </h1>
          
          <p style={{ 
            maxWidth: '750px', 
            margin: '0 auto', 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)',
            fontWeight: 500,
            lineHeight: 1.6
          }} className="animate-in hero-text-shadow">
            Programlama dünyasının temel taşlarını, karar yapılarını ve döngüsel sistemleri keşfeden, mantığın estetikle harmanlandığı modern bir dijital sergi deneyimi.
          </p>
          
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.25rem' }} className="animate-in">
            <a href="#explore" className="btn-primary" style={{ padding: '1rem 2rem' }}>
              Kolleksiyonu Keşfet <MousePointer2 size={18} />
            </a>
            <a href="#about" className="btn-outline" style={{ padding: '1rem 2rem' }}>
              Hikayemiz
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section-padding">
        <div className="container">
          <div className="about-section animate-in">
            <div className="about-grid">
              <div>
                <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Dijital Bir <br />Miras</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Mantık Müzesi, programlama mantığının karmaşık dünyasını herkes için anlaşılır ve görsel olarak etkileyici bir hale getirmeyi amaçlayan bir staj projesidir.
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                  Burada, kodların arkasındaki "niçin"leri ve "nasıl"ları keşfedecek, algoritmaların sadece matematikten ibaret olmadığını, aynı zamanda birer mimari yapı olduğunu göreceksiniz.
                </p>
              </div>
              <div style={{ background: 'var(--accent-light)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Neleri Keşfedeceksiniz?</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span>Koşullu Karar Yapıları (If-Else)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span>Döngüsel Sistemler (Loops)</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span>Mantıksal Kapılar ve Operatörler</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }}></div>
                    <span>Fonksiyonel Akış Şemaları</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section id="explore" className="section-padding" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ 
            marginBottom: '4rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end',
            borderBottom: '1px solid var(--border)',
            paddingBottom: '2rem'
          }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Mekanizmalar</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Katalogdaki güncel mantık yapıları</p>
            </div>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Programlama Mantığı Öğeleri
            </div>
          </div>
          
          <Suspense fallback={<div style={{ textAlign: 'center', padding: '8rem' }}>Sergi Yükleniyor...</div>}>
            <MechanismList />
          </Suspense>
        </div>
      </section>

      <div id="contact">
        <ContactForm />
      </div>

      <footer style={{ padding: '6rem 0', borderTop: '1px solid var(--border)', background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 600 }}>
              Mantık<span style={{ color: 'var(--accent)' }}>Müzesi</span>
            </div>
            <div style={{ opacity: 0.6, fontSize: '0.9rem' }}>
              &copy; 2024 İrem Su Staj Projesi. Tüm hakları saklıdır.
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

async function MechanismList() {
  const mechanisms = await getMechanisms();
  
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
