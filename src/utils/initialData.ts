import type { AIPrompt } from '../interfaces/prompt.interface';

export const INITIAL_PROMPTS: AIPrompt[] = [
  {
    id: 'pr-001',
    title: 'React & TypeScript Mimari & Performans Refactoring Uzmanı',
    description: 'Verilen React bileşenini SOLID prensipleri, tip güvenliği, custom hook ayrıştırması ve React 19 optimizasyonlarına göre yeniden yapılandırır.',
    category: 'Coding',
    targetModel: 'Claude 3.5 Sonnet',
    systemInstruction: 'Sen 10+ yıl deneyimli bir Principal Frontend Architect ve TypeScript/React uzmanısın. SOLID prensipleri, tip güvenliği (zero any), React derleyici optimizasyonları ve Web Vitals standartlarına tam hakimsin.',
    promptTemplate: `Sen kıdemli bir Frontend Mimarı olarak görev yapıyorsun. Aşağıda verilen {{componentName}} bileşenini analiz ederek kurumsal düzeyde refactor etmeni istiyorum.

### Kaynak Kod ve Bağlam:
- **Bileşen Adı:** {{componentName}}
- **Hedef Framework / Kütüphaneler:** {{techStack}}
- **Mevcut Kod:**
\`\`\`tsx
{{componentCode}}
\`\`\`

### Beklenen Refactoring Adımları ve Çıktılar:
1. **Mimari ve Tip Güvenliği İncelemesi:**
   - Mevcut koddaki \`any\`, zayıf type casting veya eksik interface tanımlarını tespit et ve katı TypeScript tipleriyle değiştir.
   - Props, State ve Event Handler tiplerini generic veya discriminated union yapılarıyla güçlendir.

2. **Performans ve Re-render Optimizasyonu:**
   - Gereksiz hesaplamaları saf fonksiyonlarla veya doğru memoization stratejileriyle izole et.
   - Fonksiyon referanslarını ve callback bağımlılıklarını optimize et.
   - Ağır DOM veya liste operasyonları varsa performans iyileştirmesi öner.

3. **Temiz Kod & SOLID Uyumu:**
   - Tek Sorumluluk Prensibi'ne (SRP) göre karmaşık state mantıklarını Custom Hook yapısına taşı.
   - Erişilebilirlik (WAI-ARIA, klavye navigasyonu) standartlarını sağla.

4. **Nihai Refactored Kod ve Açıklamalar:**
   - Eksiksiz, çalışmaya hazır TypeScript bileşen kodunu sun.
   - Yapılan her kritik değişikliğin nedenini (Performans, Tip Güvenliği, Okunabilirlik) maddeler halinde açıkla.`,
    tags: ['react', 'typescript', 'refactoring', 'clean-code', 'architecture'],
    temperature: 0.2,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-10T10:00:00.000Z',
    updatedAt: '2026-08-15T14:30:00.000Z',
  },
  {
    id: 'pr-002',
    title: 'SQL & BigQuery Analitik Sorgu Performans Optimizatörü',
    description: 'Yavaş çalışan veya yüksek maliyetli SQL sorgularını analiz ederek partitioning, clustering, execution plan ve slot tasarrufu çözümleri üretir.',
    category: 'Data & Analytics',
    targetModel: 'GPT-4o',
    systemInstruction: 'Sen 10+ yıl deneyimli bir Principal Data Platform Engineer ve BigQuery & SQL Performans Optimizasyon Danışmanısın. Terabaytlarca veri üzerinde çalışan sorguların slot süresini ve maliyetini minimuma indirmede uzmansın.',
    promptTemplate: `Aşağıda yavaş çalışan veya taranan veri miktarı (slot time / byte scanned) yüksek olan analitik SQL sorgusunu analiz ederek optimize etmeni istiyorum.

### Analiz Edilecek SQL Sorgusu ve Tablo Metadatası:
- **Veritabanı / Motor:** {{databaseEngine}}
- **Mevcut Sorgu:**
\`\`\`sql
{{sqlQuery}}
\`\`\`
- **Tablo Şeması ve Boyutu:** {{tableSchemaAndVolume}}
- **Karşılaşılan Temel Problem:** {{performanceBottleneck}}

### İstenen Optimizasyon Raporu ve Çözüm:
1. **Execution Plan & Bottleneck Analizi:**
   - Sorgudaki tam tablo taramalarını (Full Table Scan), pahalı JOIN operasyonlarını ve gereksiz alt sorguları (Subqueries/CTEs) tespit et.
   - Partition pruning ve Cluster filtering'i engelleyen anti-pattern'leri belirt.

2. **Optimizasyon Stratejisi:**
   - Partitioning ve Clustering kolonlarının nasıl kullanılması gerektiğini açıkla.
   - Window function veya approximate aggregation kullanım avantajlarını değerlendir.

3. **Optimize Edilmiş Nihai SQL:**
   - Temiz, formatlanmış ve production-ready ANSI-SQL / BigQuery SQL sorgusunu sun.

4. **Kazanım Özeti:**
   - Tahmini taranacak veri tasarrufu (örn: %70+ byte reduction) ve çalışma süresi kazancını maddeler halinde listele.`,
    tags: ['sql', 'bigquery', 'database', 'optimization', 'performance'],
    temperature: 0.1,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-11T12:00:00.000Z',
    updatedAt: '2026-08-16T09:15:00.000Z',
  },
  {
    id: 'pr-003',
    title: 'Kapsamlı Teknik Dokümantasyon, Mimari ve API Rehberi',
    description: 'Kaynak kodu ve endpointleri analiz ederek OpenAPI / GitHub README uyumlu, zengin ve profesyonel teknik dokümantasyon üretir.',
    category: 'Writing & Content',
    targetModel: 'Gemini 1.5 Pro',
    systemInstruction: 'Sen Google ve Stripe standartlarında geliştirici dokümanları üreten kıdemli bir Technical Writer ve API Mimarısın. Açık, net, hatasız ve Markdown formatında zengin dokümanlar hazırlarsın.',
    promptTemplate: `Aşağıda teknik detayları paylaşılan modül/servis için kurumsal düzeyde bir GitHub README & API Dokümantasyonu hazırla.

### Modül Bilgileri:
- **Modül / Servis Adı:** {{moduleName}}
- **Temel Amacı:** {{moduleDescription}}
- **API Endpointleri / Fonksiyon İmzaları:**
\`\`\`ts
{{apiOrCodeSnippet}}
\`\`\`
- **Kimlik Doğrulama / Yetkilendirme Tipi:** {{authRequirements}}

### Dokümantasyonda Yer Alması Gereken Bölümler:
1. **Genel Bakış (Overview):** Modülün ne yaptığı, hangi iş gereksinimini çözdüğü ve sistem mimarisindeki yeri.
2. **Kurulum ve Konfigürasyon (Getting Started):** Paket kurulumu, gerekli Environment Variable (.env) değişkenleri.
3. **API & Tip Referansı:** Her endpoint veya fonksiyon için HTTP metodu, URL, Request Body şeması, Response Body şeması ve Header parametre tablosu.
4. **Kod Örnekleri (Real-world Examples):** Biri temel seviye, diğeri ileri seviye (error handling içeren) 2 farklı entegrasyon örneği.
5. **Hata Kodları ve Yönetimi:** Olası hata kodları (400, 401, 404, 429, 500), hata mesajı formatı ve çözüm önerileri.
6. **Güvenlik ve Performans İpuçları:** Rate limiting, payload sanitization ve caching yönergeleri.`,
    tags: ['documentation', 'markdown', 'api', 'tech-writing', 'developer-experience'],
    temperature: 0.3,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-12T08:30:00.000Z',
    updatedAt: '2026-08-12T08:30:00.000Z',
  },
  {
    id: 'pr-004',
    title: 'Otomatik Vitest, Jest ve React Testing Library Test Süiti',
    description: 'Verilen fonksiyon veya bileşen için sınır durumları, edge-case leri, mock bağımlılıklarını ve async akışları içeren eksiksiz test süiti yazar.',
    category: 'Coding',
    targetModel: 'Claude 3.5 Sonnet',
    systemInstruction: 'Sen Test-Driven Development (TDD) konusunda uzmanlaşmış bir Senior Staff QA Automation Engineer\'sın. %100\'e yakın edge-case yakalama oranı ve kırılgan olmayan test mimarileri kurarsın.',
    promptTemplate: `Aşağıda verilen kaynak kod için Vitest ve React Testing Library (veya Jest) kullanarak eksiksiz bir birim (unit) ve entegrasyon test süiti yazmanı istiyorum.

### Test Edilecek Kod:
- **Bileşen / Fonksiyon Adı:** {{unitName}}
- **Kaynak Kod:**
\`\`\`ts
{{sourceCode}}
\`\`\`
- **Mock Edilmesi Gereken Bağımlılıklar (API, Store, Router vb.):** {{mockDependencies}}

### Kapsamlı Test Senaryoları:
1. **Happy Path (Başarılı Durumlar):**
   - Beklenen girdilerle bileşenin doğru render edilmesi veya fonksiyonun doğru çıktıyı dönmesi.
   - Kullanıcı etkileşimlerinin (tıklama, form doldurma, klavye olayları) simüle edilmesi.

2. **Sınır Durumlar (Edge Cases) & Hata Yönetimi:**
   - Null, undefined, boş dizi veya geçersiz tip girdilerinde sistemin çökmediğinin doğrulanması.
   - Ağ hatası (Network Error 500) veya asenkron reject durumlarında kullanıcıya doğru hata mesajının gösterilmesi.

3. **Asenkron State ve Mock Doğrulamaları:**
   - \`waitFor\`, \`findByRole\` gibi RTL metotlarıyla doğru async state senkronizasyonu.
   - Mock fonksiyonların (\`vi.fn()\`) kaç kez ve hangi parametrelerle çağrıldığının doğrulanması.

4. **Nihai Test Kodu:**
   - Temiz, modüler \`describe\` ve \`it\` bloklarına ayrılmış, çalıştırılabilir test dosya içeriğini eksiksiz sun.`,
    tags: ['testing', 'vitest', 'jest', 'unit-test', 'qa', 'tdd'],
    temperature: 0.2,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-13T16:45:00.000Z',
    updatedAt: '2026-08-17T11:20:00.000Z',
  },
  {
    id: 'pr-005',
    title: 'GitHub Release Notes, SemVer Changelog ve Migration Guide',
    description: 'Git commit geçmişinden veya PR listesinden kategorize edilmiş sürüm notları, kırıcı değişiklikler (breaking changes) ve geçiş kılavuzu derler.',
    category: 'Productivity',
    targetModel: 'Universal',
    systemInstruction: 'Sen büyük ölçekli açık kaynak projelerinin sürüm yönetimini yöneten bir Release Manager ve Developer Relations liderisin.',
    promptTemplate: `Aşağıda commit geçmişi ve PR başlıkları verilen yeni sürüm için profesyonel bir GitHub Release Notes ve CHANGELOG.md içeriği derle.

### Sürüm Bilgileri:
- **Hedef Sürüm:** v{{version}} (Semantic Versioning)
- **Sürüm Türü:** {{releaseType}} (Major / Minor / Patch / Hotfix)
- **Ham Git Commit Logları & PR Listesi:**
\`\`\`text
{{gitLogs}}
\`\`\`
- **Kritik Kırıcı Değişiklikler (varsa):** {{breakingChangesSummary}}

### İstenen Çıktı Formatı:
1. **Sürüm Özeti:** Bu sürümün getirdiği en önemli yeniliklerin yönetici özeti.
2. **Kategorize Edilmiş Değişiklikler:**
   - 🚀 **Yeni Özellikler (Features)**
   - 🐛 **Hata Düzeltmeleri (Bug Fixes)**
   - ⚡ **Performans İyileştirmeleri (Performance)**
   - 📚 **Dokümantasyon Güncellemeleri (Documentation)**
   - 🔧 **İç Mimari & Bakım (Chore / Refactor)**
3. **⚠️ Kırıcı Değişiklikler ve Geçiş Rehberi (Migration Guide):**
   - Eski kullanım (Before) ve Yeni kullanım (After) kod blokları.
4. **👥 Katkıda Bulunanlar (Contributors):** PR açan veya katkı sağlayan geliştiricilere teşekkür bölümü.`,
    tags: ['git', 'release-notes', 'changelog', 'github', 'devops'],
    temperature: 0.4,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-14T09:00:00.000Z',
    updatedAt: '2026-08-14T09:00:00.000Z',
  },
  {
    id: 'pr-006',
    title: 'Yüksek Dönüşümlü SaaS Landing Page & Metin Yazarlığı Stratejisti',
    description: 'Hedef kitle, değer önerisi, acı noktaları ve itirazları ele alan yüksek dönüşümlü (CRO) landing page metinleri ve CTA setleri oluşturur.',
    category: 'Marketing',
    targetModel: 'GPT-4o',
    systemInstruction: 'Sen 10+ yıldır SaaS ürünlerinin dönüşüm oranlarını (CRO) optimize eden kıdemli bir Growth Marketer ve Copywriter\'sın. PAS (Problem-Agitate-Solution) ve StoryBrand formüllerini mükemmel uygularsın.',
    promptTemplate: `Aşağıda detayları verilen yazılım ürünü (SaaS) için dönüşüm oranı yüksek (high-converting) bir Landing Page metin seti ve içerik stratejisi hazırla.

### Ürün ve Hedef Kitle Detayları:
- **Ürün / Servis Adı:** {{productName}}
- **Hedef Kitle (ICP):** {{targetAudience}}
- **Çözülen Ana Problem:** {{coreProblem}}
- **Ürünün Benzersiz Değer Önerisi (UVP):** {{uniqueValueProp}}
- **Fiyatlandırma Modeli:** {{pricingModel}}

### Landing Page İçerik Blokları:
1. **Hero Section (Açılış Alanı):**
   - 3 farklı dikkat çekici Ana Başlık (H1) alternatifi (Merak uyandıran, Doğrudan fayda odaklı, Sosyal kanıt odaklı).
   - 2 cümlelik açıklayıcı Alt Başlık (Subheadline).
   - Yüksek tıklama sağlayan Birincil ve İkincil CTA buton metinleri.

2. **Problem & Çözüm (PAS Formülü):**
   - Hedef kitlenin her gün yaşadığı 3 acı noktayı (Pain points) canlandıran ve ürünün getirdiği çözümü anlatan paragraflar.

3. **Özelliklerden Faydaya (Features to Benefits):**
   - 4 temel ürün özelliğini "Özellik değil, kazanılan zaman/para/kolaylık" perspektifinden anlatan başlık + 2 satırlık kart metinleri.

4. **Sosyal Kanıt ve Güven Unsurları:**
   - Müşteri yorumu (Testimonial) şablonu ve güven rozeti önerileri.

5. **Dönüşüm Odaklı SSS (FAQ):**
   - Satın alma öncesi kullanıcının aklına gelebilecek 4 kritik itiraza (Fiyat, Kurulum zorluğu, Güvenlik, İade) yanıt veren soru-cevap seti.`,
    tags: ['marketing', 'copywriting', 'landing-page', 'saas', 'cro'],
    temperature: 0.7,
    isFavorite: false,
    usageCount: 0,
    createdAt: '2026-08-15T15:20:00.000Z',
    updatedAt: '2026-08-18T10:00:00.000Z',
  }
];
