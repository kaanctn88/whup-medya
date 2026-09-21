export type Service = {
  icon: string;
  title: string;
  desc: string;
  bullets: string[];
  metric: string;
  featured?: boolean;
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    icon: "target",
    title: "Dijital Performans & Reklam Yönetimi",
    desc: "Meta • Google • TikTok Ads. Kreatif test + medya + CRO tek sprint'te.",
    bullets: [
      "Haftalık kreatif test döngüsü",
      "ROAS & MER bazlı ölçekleme",
      "Canlı dashboard + rapor",
    ],
    metric: "Ort. +%240 ROAS artışı",
    image: "/images/services/performans.jpg",
    imageAlt: "Reklam performans paneli ve analiz ekranı",
  },
  {
    icon: "clapperboard",
    title: "Kreatif Prodüksiyon & Viral Video",
    desc: "Reels / Shorts / TikTok. İlk 3 saniyede kanca, son saniyede aksiyon.",
    bullets: [
      "Senaryo + çekim + viral kurgu",
      "4K + FPV drone + ses tasarımı",
      "Aylık 20+ içerik bandı",
    ],
    metric: "1.2M organik izlenme / seri",
    featured: true,
    image: "/images/services/produksiyon.jpg",
    imageAlt: "Profesyonel video prodüksiyon kamerası",
  },
  {
    icon: "palette",
    title: "Marka Kimliği & Web Deneyimi",
    desc: "Logo'dan siteye: 90+ hız skoru, SEO'ya hazır, satışa odaklı.",
    bullets: ["Kimlik + tipografi + sistem", "Next.js / yüksek hızlı web", "CRO + SEO mimarisi"],
    metric: "x3.1 dönüşüm artışı",
    image: "/images/services/marka-web.jpg",
    imageAlt: "Marka ve web tasarım çalışma masası",
  },
  {
    icon: "users",
    title: "Sosyal Medya & Topluluk İnşası",
    desc: "Takvim + içerik + moderasyon. Takipçi değil, topluluk büyütürüz.",
    bullets: ["Aylık içerik takvimi", "Yorum / DM yönetimi", "Büyüme raporu + insight"],
    metric: "+12K takipçi / 90 gün",
    image: "/images/services/sosyal-medya.jpg",
    imageAlt: "Telefonda sosyal medya uygulaması",
  },
];

export type CaseItem = {
  cat: "performans" | "prodüksiyon" | "marka";
  label: string;
  title: string;
  problem: string;
  solution: string;
  metrics: string[];
  gradient: string;
  icon: string;
  image: string;
  imageAlt: string;
  sector: string;
  year: string;
};

export const cases: CaseItem[] = [
  {
    cat: "performans",
    label: "PERFORMANS",
    title: "Moda Nova — E-ticaret Ölçekleme",
    problem: "ROAS 1.8'de takılı, kreatif yorgunluğu.",
    solution: "12 kreatif / hafta test + geniş + retargeting mimarisi.",
    metrics: ["ROAS 1.8 → 6.1", "CAC -%42"],
    gradient: "from-[#1B2B5E] to-[#0B0F19]",
    icon: "shopping-bag",
    sector: "E-ticaret",
    year: "2025",
    image: "/images/cases/moda-nova.jpg",
    imageAlt: "Moda Nova mağaza ve ürün çekimi",
  },
  {
    cat: "prodüksiyon",
    label: "PRODÜKSİYON",
    title: "Atlas Fitness — Viral Klip Serisi",
    problem: "Salon dolu ama sosyal medya ölü.",
    solution: "15'lik motivasyon serisi + hook-first kurgu + trend sesler.",
    metrics: ["1.2M organik", "+%95 üyelik talebi"],
    gradient: "from-[#5E1B3A] to-[#0B0F19]",
    icon: "flame",
    sector: "Fitness",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Atlas Fitness salon antrenman çekimi",
  },
  {
    cat: "marka",
    label: "MARKA & WEB",
    title: "Skyline — Site + Lansman Filmi",
    problem: "Yavaş site, düşük form doldurma.",
    solution: "Next.js'e geçiş + sinematik lansman + 360° tur.",
    metrics: ["32 daire satışı", "Hız 94/100"],
    gradient: "from-[#0E4A44] to-[#0B0F19]",
    icon: "building-2",
    sector: "Gayrimenkul",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Skyline rezidans dış cephe çekimi",
  },
  {
    cat: "performans",
    label: "PERFORMANS",
    title: "Turbo Auto — Lansman + Ads",
    problem: "Yeni model bilinmiyor, showroom trafiği düşük.",
    solution: "FPV lansman filmi + YouTube + Meta full-funnel.",
    metrics: ["2.4M izlenme", "+%180 test sürüşü"],
    gradient: "from-[#3A1B5E] to-[#0B0F19]",
    icon: "car",
    sector: "Otomotiv",
    year: "2025",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Turbo Auto lansman otomobil çekimi",
  },
  {
    cat: "prodüksiyon",
    label: "PRODÜKSİYON",
    title: "Lezzet Evi — 30 Günlük Büyüme",
    problem: "Lezzet var, içerik yok. Keşfet sıfır.",
    solution: "40 Reels + iştah kurgusu + konum bazlı dağıtım.",
    metrics: ["+12K takipçi", "Hafta sonu kuyruk"],
    gradient: "from-[#5E4A1B] to-[#0B0F19]",
    icon: "utensils",
    sector: "Yeme-İçecek",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Lezzet Evi restoran atmosfer çekimi",
  },
  {
    cat: "marka",
    label: "MARKA & WEB",
    title: "Elit Otel — Kimlik + Rezervasyon",
    problem: "Premium fiyat, amatör algı.",
    solution: "Lüks kimlik + sinematik site + SEO.",
    metrics: ["Direkt rezervasyon x2.4", "Google 1. sayfa"],
    gradient: "from-[#1B3A5E] to-[#0B0F19]",
    icon: "gem",
    sector: "Turizm",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
    imageAlt: "Elit Otel havuz ve konaklama çekimi",
  },
];

export const testimonials = [
  {
    text: "Lansman filmimiz 2 haftada 1 milyonu geçti. Bayiler bile arayıp kimin çektiğini sordu.",
    name: "Murat K. — Turbo Auto",
    role: "Reklam Filmi Projesi",
    initials: "MK",
    metric: "2 haftada 1M+ izlenme",
    color: "from-electric to-sky-600",
  },
  {
    text: "3 ayda 8 binden 20 bine çıktık. Hafta sonları kapıda kuyruk oluyor, içerikler satış getiriyor.",
    name: "Elif S. — Lezzet Evi",
    role: "Sosyal Medya Yönetimi",
    initials: "ES",
    metric: "8B → 20B takipçi",
    color: "from-violet to-fuchsia-600",
  },
  {
    text: "Site Google'da ilk sayfaya çıktı, online talepler %140 arttı. Raporlama çok şeffaftı.",
    name: "Hakan D. — Skyline",
    role: "Web & SEO Projesi",
    initials: "HD",
    metric: "%140 online talep artışı",
    color: "from-tang to-amber-500",
  },
];

export const logos = [
  "NOVA GAYRİMENKUL",
  "TURBO AUTO",
  "MODA NOVA",
  "ATLAS FİTNESS",
  "LEZZET EVİ",
  "KARDEMİR",
  "ELİT OTEL",
  "KAHVE DURAĞI",
];
