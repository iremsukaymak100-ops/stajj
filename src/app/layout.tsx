import { Suspense } from 'react';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mantık Müzesi | Programlama Mantığının Mimari Arşivi',
  description: 'Programlama dünyasının temel taşları olan karar vericileri ve döngüsel yapıları keşfeden modern, dijital bir müze.',
  keywords: ['programlama', 'mantık', 'algoritma', 'yazılım', 'eğitim', 'müze'],
  authors: [{ name: 'İrem Su' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>
        <Suspense fallback={<div className="glass" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Yükleniyor...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
