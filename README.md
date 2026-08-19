# 🚀 PromptStudio AI — Yapay Zeka Prompt & Şablon Yöneticisi

> **“Web Geliştirme; Yapay Zeka Proje Yönergesi”** standartlarına tam uyumlu olarak geliştirilmiş; **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4** ve **LocalStorage** destekli modern, modüler ve yüksek performanslı Web Uygulaması.

---

## 📸 Ekran Önizlemesi

```text
+-----------------------------------------------------------------------------------+
|  ✨ PromptStudio AI    [Genel Bakış]  [Prompt Kütüphanesi (6)]  [Test Alanı] [Hakkında] |
+-----------------------------------------------------------------------------------+
|  🎯 HERO: Yapay Zeka Promptlarınızı Tek Bir Yerden Yönetin ve Test Edin           |
|  [+ Yeni Prompt Oluştur]  [Kütüphaneye Git]  [Test Alanını Aç]                    |
|                                                                                   |
|  📊 KPI STATS                                                                     |
|  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌────────────────┐ |
|  │ Toplam: 6 Prompt │ │ Kategori: 5 Alan │ │ Modeller: 4 AI   │ │ Dinamik Şablon │ |
|  └──────────────────┘ └──────────────────┘ └──────────────────┘ └────────────────┘ |
|                                                                                   |
|  ⚡ PROMPT KÜTÜPHANESİ & CRUD İŞLEMLERİ                                           |
|  [🔍 Arama Yap...] [Kategori: Tümü ▾] [Model: Tümü ▾] [Sırala ▾] [⭐ Favoriler]     |
|  ┌─────────────────────────────────┐ ┌─────────────────────────────────┐          |
|  │ 🏷️ Coding • 🤖 Claude 3.5 Sonnet│ │ 🏷️ Data • 🤖 GPT-4o             │          |
|  │ React & TS Mimari Refactoring   │ │ SQL & BigQuery Analitik Opt.    │          |
|  │ Dinamik {{değişken}} parametreli│ │ Dinamik {{değişken}} parametreli│          |
|  │ [📋 Kopyala] [▶️ Doldur] [✏️] [🗑️]│ │ [📋 Kopyala] [▶️ Doldur] [✏️] [🗑️]│          |
|  └─────────────────────────────────┘ └─────────────────────────────────┘          |
+-----------------------------------------------------------------------------------+
```

---

## 🎯 Projenin Amacı ve Çözdüğü Problem

Geliştiriciler, içerik üreticileri ve veri bilimciler birden fazla yapay zeka modeli (GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, DeepSeek V3) için yazdıkları karmaşık promptları ve değişkenli şablonları dağınık notlarda veya metin belgelerinde saklamakta zorlanırlar.

**PromptStudio AI**, bu sorunu çözerek:
1. Şablonları kategorize eder ve etiketler.
2. `{{degiskenAdi}}` biçimindeki dinamik yer tutucuları otomatik tespit eder.
3. Değişkenleri form üzerinden kolayca doldurup nihai promptu anında panoya kopyalama imkanı sunar.
4. Tüm verileri yerel depolamada (**LocalStorage**) güvenle saklayarak harici backend veya hesap kurulumu ihtiyacını ortadan kaldırır.

---

## 🛠️ Kullanılan Teknolojiler

- **Kütüphane & Çerçeve:** [React 19](https://react.dev/)
- **Dil:** [TypeScript](https://www.typescriptlang.org/) (Strict Type-Safety, sıfır `any` kullanımı)
- **Derleyici & Paketleyici:** [Vite](https://vite.dev/)
- **Stil & Tasarım:** [Tailwind CSS v4](https://tailwindcss.com/) (Glassmorphism, Modern Dark Palette)
- **İkon Seti:** [Lucide React](https://lucide.dev/)
- **Veri Saklama:** HTML5 LocalStorage (Type-safe `PromptService` soyutlaması)
- **Deployment Hedefleri:** [Netlify](https://www.netlify.com/) & [Vercel](https://vercel.com/) (SPA redirect kuralları hazır)

---

## 📁 Mimari ve Klasör Ağaç Yapısı

Yönergede belirtilen **Components**, **Pages** ve **Interfaces** klasör mimarisine harfiyen uyulmuştur:

```text
src/
├── assets/                  # Vektör ve görsel kaynaklar
├── components/              # Yeniden kullanılabilir UI bileşenleri
│   ├── common/              # Navbar, Footer, Button, Badge, Modal, Toast, EmptyState
│   ├── dashboard/           # StatsOverview, CategoryDistribution, RecentPrompts
│   └── prompts/             # PromptCard, PromptTable, PromptFormModal,
│                            # PromptDetailModal, PromptTestModal,
│                            # DeleteConfirmModal, SearchFilterBar
├── interfaces/              # TypeScript Type ve Interface tanımları
│   ├── prompt.interface.ts  # AIPrompt, AIPromptFormData, PromptCategory, AIModel
│   ├── filter.interface.ts  # PromptFilterState, SortOption, ViewMode
│   ├── toast.interface.ts   # ToastMessage, ToastType
│   └── stats.interface.ts   # DashboardStats
├── pages/                   # Sayfa seviyesi bileşenler
│   ├── DashboardPage.tsx    # İstatistikler, KPI paneli ve hızlı aksiyonlar
│   ├── PromptsPage.tsx      # Ana CRUD yönetim merkezi (Grid & Tablo)
│   ├── PlaygroundPage.tsx   # Canlı değişken enjeksiyonu ve prompt test alanı
│   └── AboutPage.tsx        # Proje mimarisi ve uyumluluk raporu
├── hooks/                   # Custom Hook'lar (usePrompts, useToast)
├── services/                # Veri katmanı (PromptService - LocalStorage CRUD)
├── utils/                   # Yardımcı araçlar (initialData, helpers)
├── App.tsx                  # Ana uygulama ve modal orkestrasyonu
├── main.tsx                 # React DOM giriş noktası
└── index.css                # Tailwind CSS v4 ve global stiller
```

---

## ✨ Temel Özellikler & CRUD Mimarisi

### 1. 🟢 CREATE (Ekleme)
- Başlık, kategori, model, kısa açıklama, sistem talimatı, şablon metni, etiketler ve sıcaklık (creativity) parametresi içeren modal form.
- Form üzerinde boş alan, karakter limiti ve sıcaklık aralığı için **kapsamlı validasyon**.
- Şablon metninde yazılan `{{degisken}}` etiketlerini form üzerinde **anlık tespit edip rozet olarak gösterme**.

### 2. 🔵 READ / LIST (Listeleme & Okuma)
- **İkili Görünüm Desteği:** Kart (Grid) veya Tablo (Table) görünümü.
- **Anlık Metin Araması:** Başlık, açıklama, şablon içeriği ve etiketlerde gerçek zamanlı arama.
- **Çoklu Filtreleme:** Kategoriye ve AI Modeline göre filtreleme + Sadece Favorileri Göster filtresi.
- **Sıralama:** En yeni, en eski, alfabetik (A-Z / Z-A), en çok kullanılanlar ve favoriler öncelikli sıralama.
- **Detay Modalı:** Şablonun tüm meta verilerini, sistem rolünü ve değişkenlerini inceleme ekranı.

### 3. 🟡 UPDATE (Güncelleme)
- Düzenle butonu ile mevcut verilerin formda önceden doldurulması (**pre-fill**).
- Tek tıkla favoriye ekleme/çıkarma.
- Güncellenen verilerin anında ekranda ve `LocalStorage` üzerinde senkronize edilmesi.

### 4. 🔴 DELETE (Silme)
- Yanlışlıkla silmeleri önleyen **Güvenli Silme Onay Modalı** (`DeleteConfirmModal`).
- Silme işlemi tamamlandığında kullanıcıya **Toast Bildirimi** verilmesi.

### 5. 🧪 PLAYGROUND & TEST (Değişken Enjeksiyonu)
- Kütüphaneden seçilen veya özel yazılan şablonlardaki tüm değişkenleri tespit eder.
- Her değişken için giriş alanı üretir, değerleri dinamik olarak şablon içerisine enjekte eder.
- Nihai hazır promptu tek tıkla panoya kopyalar ve kullanım sayacını artırır.

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- **Node.js**: v18.0.0 veya üzeri
- **npm** / **yarn** / **pnpm**

### Adım 1: Depoyu Klonlayın veya İndirin
```bash
git clone https://github.com/kullaniciadi/prompt-studio-ai.git
cd prompt-studio-ai
```

### Adım 2: Bağımlılıkları Yükleyin
```bash
npm install
```

### Adım 3: Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Tarayıcınızda `http://localhost:5173` adresini açarak uygulamayı test edebilirsiniz.

### Adım 4: Production Build Alın
```bash
npm run build
```

### Adım 5: Build Önizlemesi
```bash
npm run preview
```

---

## 🌐 Canlı Yayına Alma (Deployment)

Proje, **Netlify** ve **Vercel** platformlarına doğrudan deploy edilmeye hazırdır.

### Netlify Deployment:
1. [Netlify](https://app.netlify.com)'e giriş yapın ve `Add new site > Import an existing project` seçeneğini tıklayın.
2. GitHub deponuzu seçin.
3. Build ayarları otomatik algılanacaktır:
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
4. Projede yer alan `public/_redirects` ve `netlify.toml` dosyaları sayesinde SPA sayfaları 404 hatası vermeden kusursuz çalışır.

### Vercel Deployment:
1. [Vercel](https://vercel.com)'e giriş yapın ve `Add New Project` seçeneğini tıklayın.
2. GitHub deponuzu içe aktarın.
3. `vercel.json` yapılandırması sayesinde tek tıkla yayına alınır.

---

## 📋 Yönerge Uyumluluk Denetimi (Audit)

| Yönerge Maddesi | Durum | Karşılandığı Bileşen / Dosya |
| :--- | :---: | :--- |
| **Modern JS Kütüphanesi** | ✅ PASS | React 19 + TypeScript + Vite (`src/App.tsx`, `package.json`) |
| **CSS Çerçevesi** | ✅ PASS | Tailwind CSS v4 (`src/index.css`, `vite.config.ts`) |
| **Components Klasörü** | ✅ PASS | `src/components/` (Common, Dashboard, Prompts) |
| **Pages Klasörü** | ✅ PASS | `src/pages/` (Dashboard, Prompts, Playground, About) |
| **Interfaces Klasörü** | ✅ PASS | `src/interfaces/` (prompt, filter, toast, stats interfaces) |
| **CREATE İşlemi** | ✅ PASS | `src/components/prompts/PromptFormModal.tsx` + `PromptService.create()` |
| **READ / LIST İşlemi** | ✅ PASS | `src/components/prompts/PromptCard.tsx` & `PromptTable.tsx` |
| **UPDATE İşlemi** | ✅ PASS | `src/components/prompts/PromptFormModal.tsx` + `PromptService.update()` |
| **DELETE İşlemi** | ✅ PASS | `src/components/prompts/DeleteConfirmModal.tsx` + `PromptService.delete()` |
| **LocalStorage Desteği** | ✅ PASS | `src/services/promptService.ts` & `src/hooks/usePrompts.ts` |
| **Form Validasyonu** | ✅ PASS | `PromptService.validateForm()` (Hata mesajları ve kısıtlar) |
| **Kullanıcı Geri Bildirimi** | ✅ PASS | `src/components/common/Toast.tsx` & `src/hooks/useToast.ts` |
| **Responsive Tasarım** | ✅ PASS | Mobil, Tablet ve Masaüstü uyumlu flex & grid düzenleri |
| **Netlify / Vercel Hazırlığı** | ✅ PASS | `public/_redirects`, `netlify.toml`, `vercel.json` |
| **Build Testi** | ✅ PASS | `npm run build` sıfır hata ile tamamlanmaktadır |
| **GitHub README** | ✅ PASS | Kapsamlı `README.md` dokümantasyonu |

---

## 📄 Lisans
Bu proje eğitim ve portföy amaçlı olarak MIT lisansı altında hazırlanmıştır.
