// app/page.tsx atau component manapun
'use client';

import CurvedLoop from '@/components/reactbits/CurvedLoop';

export default function Home() {
  return (
    <div className="px-6 py-12">
      {/* Hanya CurvedLoop, tidak ada text lain */}
      <CurvedLoop 
        marqueeText="Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦Kelas Struktur ✦ Kelas Struktur ✦"
        speed={2}
        curveAmount={0}
        direction="left"
        interactive={true}
        className="text-emerald-500 dark:text-blue-500 text-2xl md:text-2xl font-bold uppercase tracking-wider"
      />
    </div>
  );
}