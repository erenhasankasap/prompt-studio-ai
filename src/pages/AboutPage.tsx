import React from 'react';
import {
  CheckCircle2,
  FolderTree,
  Sparkles,
  Code2,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../components/common/Button';

export interface AboutPageProps {
  onNavigateToPrompts: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToPrompts }) => {
  const complianceItems = [
    { title: 'Modern JavaScript Kütüphanesi', desc: 'React 19 & TypeScript ile modern SPA mimarisi', status: 'PASS' },
    { title: 'CSS Çerçevesi', desc: 'Tailwind CSS v4 ile responsive, modern ve karanlık tema arayüzü', status: 'PASS' },
    { title: 'Dosya Ağacı Yapısı', desc: 'Components, Pages, Interfaces klasörleri eksiksiz ayrıştırıldı', status: 'PASS' },
    { title: 'Create (Ekleme) İşlemi', desc: 'Validasyonlu form ve modal ile yeni kayıt oluşturma', status: 'PASS' },
    { title: 'Read / List (Listeleme)', desc: 'Kart ve Tablo görünümü, arama, kategori/model filtreleme ve sıralama', status: 'PASS' },
    { title: 'Update (Güncelleme)', desc: 'Form ön-doldurma ve anlık veri güncelleme desteği', status: 'PASS' },
    { title: 'Delete (Silme)', desc: 'Güvenli silme onay modalı ve bildirim entegrasyonu', status: 'PASS' },
    { title: 'LocalStorage Entegrasyonu', desc: 'Kalıcı veri saklama, hata toleransı ve varsayılan veri tohumlama', status: 'PASS' },
    { title: 'Netlify / Vercel Yayına Hazırlık', desc: 'Production build uyumu ve SPA yönlendirme konfigürasyonu', status: 'PASS' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-8 sm:p-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-indigo-400">
              Proje Dokümantasyonu
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              PromptStudio AI — Proje & Mimari Rehberi
            </h1>
          </div>
        </div>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Bu web uygulaması, <strong>“Web Geliştirme; Yapay Zeka Proje Yönergesi”</strong> kapsamında istenen tüm teorik ve pratik gereksinimleri modern frontend mühendisliği standartlarıyla eksiksiz karşılamak üzere geliştirilmiştir.
        </p>
      </div>

      {/* Compliance Checklist */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md">
        <div className="flex items-center gap-2 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <h2 className="text-lg font-bold text-white tracking-tight">
            Yönerge Gereksinim Uyumluluk Tablosu (Audit)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {complianceItems.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture & Folder Structure */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Folder Structure */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2">
            <FolderTree className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Modüler Klasör Mimarisi
            </h3>
          </div>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
            <pre>{`src/
├── components/          # Reusable UI parçaları
│   ├── common/          # Navbar, Footer, Modal, Toast
│   ├── dashboard/       # Stats, CategoryDistribution
│   └── prompts/         # Card, Table, Form, Detail, Test
├── pages/               # Sayfa seviyesi bileşenler
│   ├── DashboardPage.tsx
│   ├── PromptsPage.tsx
│   ├── PlaygroundPage.tsx
│   └── AboutPage.tsx
├── interfaces/          # Tip ve Model tanımları
│   ├── prompt.interface.ts
│   ├── filter.interface.ts
│   └── toast.interface.ts
├── hooks/               # usePrompts, useToast
├── services/            # PromptService (LocalStorage)
└── utils/               # initialData, helpers`}</pre>
          </div>
        </div>

        {/* CRUD & Features */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md space-y-4">
          <div className="flex items-center gap-2">
            <Code2 className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white tracking-tight">
              CRUD & Kullanıcı Deneyimi
            </h3>
          </div>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <strong className="text-indigo-400 shrink-0 font-mono">CREATE:</strong>
              <span>Başlık, açıklama, kategori, model, sıcaklık ve şablon validasyonu ile prompt ekleme.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <strong className="text-emerald-400 shrink-0 font-mono">READ:</strong>
              <span>Kart ve tablo görünümü, anlık metin araması, kategori & model filtreleme, sıralama.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <strong className="text-amber-400 shrink-0 font-mono">UPDATE:</strong>
              <span>Var olan kaydı düzenleme formu, tek tıkla favori açma/kapatma ve etiket güncelleme.</span>
            </li>
            <li className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80">
              <strong className="text-rose-400 shrink-0 font-mono">DELETE:</strong>
              <span>Kalıcı veri kaybını önleyen onay modalı ve geri bildirim Toast bildirimi.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Deployment & Tech Stack */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <h3 className="text-base font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
            <Rocket className="w-5 h-5 text-indigo-400" />
            Netlify & Vercel Yayına Hazırlık
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            Proje, tek komutla (<code className="text-indigo-300">npm run build</code>) hatasız derlenir ve doğrudan GitHub üzerinden Netlify veya Vercel&apos;e deploy edilebilir.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          onClick={onNavigateToPrompts}
          className="shrink-0"
        >
          Kütüphaneyi Keşfet
        </Button>
      </div>
    </div>
  );
};
