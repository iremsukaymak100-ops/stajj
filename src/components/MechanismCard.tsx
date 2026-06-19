'use client';

import { Mechanism } from '@/lib/supabase';
import { motion } from 'framer-motion';
import { Code2, Repeat, GitBranch, Binary, ChevronRight } from 'lucide-react';

interface Props {
  mechanism: Mechanism;
}

export default function MechanismCard({ mechanism }: Props) {
  const getIcon = (category: string) => {
    switch (category) {
      case 'condition': return <GitBranch className="text-accent" size={24} />;
      case 'loop': return <Repeat className="text-accent" size={24} />;
      case 'branch': return <Binary className="text-accent" size={24} />;
      default: return <Code2 className="text-accent" size={24} />;
    }
  };

  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card-hover"
      style={{ 
        padding: '2.5rem', 
        borderRadius: 'var(--radius)', 
        border: '1px solid var(--border)',
        background: 'var(--card-bg)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{ 
        position: 'absolute', 
        top: '1.5rem', 
        right: '1.5rem', 
        opacity: 0.15,
      }}>
        {getIcon(mechanism.category)}
      </div>
      
      <header>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.75rem', 
          marginBottom: '1rem' 
        }}>
          <div style={{ 
            background: 'var(--accent-light)', 
            padding: '0.5rem', 
            borderRadius: '6px' 
          }}>
            {getIcon(mechanism.category)}
          </div>
          <span style={{ 
            fontSize: '0.75rem', 
            textTransform: 'uppercase', 
            letterSpacing: '0.15em', 
            color: 'var(--accent)', 
            fontWeight: 700 
          }}>
            {mechanism.category}
          </span>
        </div>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          {mechanism.title}
        </h3>
      </header>

      <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: '1.7' }}>
        {mechanism.description}
      </p>

      <div style={{ marginTop: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          marginBottom: '1rem',
          fontSize: '0.85rem',
          fontWeight: 600,
          color: 'var(--text-primary)'
        }}>
          <Code2 size={16} /> Syntax Yapısı
        </div>
        <pre style={{ margin: 0 }}>
          <code>{mechanism.code_example}</code>
        </pre>
      </div>
      
      <div style={{ 
        display: 'flex', 
        justifyContent: 'flex-end', 
        marginTop: '1rem',
        opacity: 0.5,
        fontSize: '0.8rem',
        fontWeight: 500
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          Detayları Gör <ChevronRight size={14} />
        </div>
      </div>
    </motion.article>
  );
}
