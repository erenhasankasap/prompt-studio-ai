# 🚀 PromptStudio AI — Yapay Zeka Prompt & Şablon Yöneticisi

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.2-646CFF?style=flat&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**PromptStudio AI**, yapay zeka mühendisleri, geliştiriciler ve içerik üreticileri için tasarlanmış; **Claude 3.5 Sonnet**, **GPT-4o**, **Gemini 1.5 Pro** ve **DeepSeek V3** gibi gelişmiş yapay zeka modellerine yönelik dinamik prompt şablonlarını tek bir merkezden yönetmeyi, değişkenlerini canlı olarak doldurmayı ve test etmeyi sağlayan modern bir web platformudur.

---

## 📸 Arayüz Önizlemesi

```text
+-----------------------------------------------------------------------------------+
|  ✨ PromptStudio AI    [Genel Bakış]  [Prompt Kütüphanesi (6)]  [Test Alanı] [Hakkında] |
+-----------------------------------------------------------------------------------+
|  🎯 HERO: Yapay Zeka Promptlarınızı Tek Bir Yerden Yönetin ve Test Edin           |
|  [+ Yeni Prompt Oluştur]  [Kütüphaneye Git]  [Test Alanını Aç]                    |
|                                                                                   |
|  📊 METRİK & DAĞILIM PANOSU                                                       |
|  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐ ┌────────────────┐ |
|  │ Toplam: 6 Prompt │ │ Kategori: 5 Alan │ │ Modeller: 4 AI   │ │ Dinamik Şablon │ |
|  └──────────────────┘ └──────────────────┘ └──────────────────┘ └────────────────┘ |
|                                                                                   |
|  ⚡ PROMPT KÜTÜPHANESİ & CRUD YÖNETİMİ                                            |
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

## 🎯 Projenin Çözdüğü Problem

Farklı yapay zeka modelleri için hazırlanan prompt şablonları genellikle not uygulamalarında veya dağınık metin dosyalarında kaybolur. Özellikle birden çok parametre içeren dinamik şablonlarda değişkenleri manuel olarak arayıp doldurmak zaman kaybına ve hatalara yol açar.

**PromptStudio AI**, bu süreci tamamen otomatikleştirir:
- **Merkezi Şablon Havuzu:** Tüm promptlarınızı kategori, model ve etiket bazında organize eder.
- **Otomatik Değişken Tespiti:** Şablon içindeki `{{degiskenAdi}}` formatındaki alanları anında algılar.
- **Canlı Test & Enjeksiyon Alanı:** Değişkenleri form alanları üzerinden doldurup nihai promptu tek tıkla panoya kopyalama imkanı sunar.
- **Sıfır Bağımlılık & Güvenli Depolama:** Harici veritabanı veya hesap gerektirmeksizin tüm verileri tarayıcının yerel hafızasında (`LocalStorage`) saklar.

---

## ✨ Temel Özellikler

### 1. 📊 Genel Bakış & Metrikler
- **Gerçek Zamanlı İstatistikler:** Kütüphanedeki toplam prompt sayısı, kategori çeşitliliği, desteklenen AI modelleri ve parametrik şablon oranı.
- **Kategori & Model Dağılımı:** Hangi kategorilerde (Coding, Data, Marketing vb.) ve hangi modellerde yoğunlaşıldığını gösteren görsel çubuk grafikler.
- **Son Eklenen Şablonlar:** En son güncellenen promptlara hızlı erişim ve doğrudan test etme butonları.

### 2. 📚 Prompt Kütüphanesi & CRUD Yönetimi
- **İkili Görünüm Modu:** İhtiyaca göre kart (Grid) veya detaylı liste (Table) görünümü arasında anlık geçiş.
- **Anlık Metin Araması:** Başlık, açıklama, şablon metni ve etiketlerde gerçek zamanlı filtreleme.
- **Gelişmiş Filtreleme:** Kategori, AI modeli ve favori durumuna göre filtreleme.
- **Esnek Sıralama:** En yeni, en eski veya alfabetik (A-Z / Z-A) sıralama.
- **Tam CRUD Desteği:**
  - **Create:** Validasyonlu ve değişken önizlemeli yeni prompt ekleme modalı.
  - **Read:** Şablon detaylarını, sıcaklık (temperature) değerini ve sistem rollerini inceleme ekranı.
  - **Update:** Mevcut şablonu formda ön-doldurarak (pre-fill) anında güncelleme.
  - **Delete:** Yanlışlıkla silmeleri önleyen onay modalı ile güvenli kaldırma.

### 3. 🧪 Değişken Enjeksiyonu & Playground (Test Alanı)
- Kütüphaneden seçilen veya serbestçe yazılan şablonlardaki tüm `{{değişken}}` yapılarını dinamik form alanlarına dönüştürür.
- Değerler girildikçe nihai çıktıyı anlık olarak derler ve tek tıkla panoya kopyalar.

### 4. 🛡️ Katı Tip Güvenliği & Hata Toleransı
- Sıfır `any` prensibi ile katı TypeScript arayüzleri (`interface`) ve tipleri.
- Form validasyonları, karakter limitleri ve güvenli silme mekanizmaları.
- Geri bildirimler için modern ve animasyonlu **Toast Bildirim Sistemi**.

---

## 🛠️ Teknoloji Yığını

| Katman | Teknoloji | Açıklama |
| :--- | :--- | :--- |
| **Kütüphane** | React 19 | En güncel React çekirdeği ve modern component mimarisi |
| **Programlama Dili** | TypeScript 5.7 | Katı tip tanımları ve compile-time güvenlik |
| **Derleme Aracı** | Vite 8 | Ultra hızlı HMR (Hot Module Replacement) ve optimize bundle |
| **Stil & Tasarım** | Tailwind CSS v4 | Glassmorphism, modern koyu tema (dark palette) ve mikro animasyonlar |
| **İkonlar** | Lucide React | Modern ve tutarlı SVG ikon kütüphanesi |
| **Veri Katmanı** | HTML5 LocalStorage | Type-safe `PromptService` sınıfı üzerinden yerel veri yönetimi |

---

## 📁 Proje Dosya ve Klasör Mimarisi

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
├── pages/                   # Sayfa seviyesi ana bileşenler
│   ├── DashboardPage.tsx    # Genel bakış paneli ve metrikler
│   ├── PromptsPage.tsx      # Prompt kütüphanesi ve CRUD arayüzü
│   ├── PlaygroundPage.tsx   # Canlı değişken enjeksiyonu ve test alanı
│   └── AboutPage.tsx        # Proje mimarisi ve teknik detaylar
├── hooks/                   # Custom Hook'lar (usePrompts, useToast)
├── services/                # Veri katmanı (PromptService - LocalStorage CRUD)
├── utils/                   # Yardımcı fonksiyonlar (initialData, helpers)
├── App.tsx                  # Ana uygulama düzeni ve modal yönetimi
├── main.tsx                 # React DOM başlatıcı
└── index.css                # Tailwind CSS stilleri ve tema değişkenleri
```

---

## 💻 Yerel Geliştirme ve Kurulum

### Önkoşullar
- **Node.js**: v18.0.0 veya üzeri
- **npm** (veya `yarn` / `pnpm`)

### 1. Depoyu İndirin ve Proje Dizinine Geçin
```bash
cd prompt-studio-ai
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışacaktır.

### 4. Üretim İçin Derleyin (Production Build)
```bash
npm run build
```

### 5. Derleme Çıktısını Önizleyin
```bash
npm run preview
```

---

## 📄 Lisans

Bu proje **MIT Lisansı** altında lisanslanmıştır.
