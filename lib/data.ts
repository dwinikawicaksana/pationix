import { LandingData } from "@/types/landing";

export function getLandingData(): LandingData {
  return {
    navbar: {
      logo: "Paitonix",
      links: [
        { label: "Portofolio", href: "#case-studies" },
        { label: "Layanan", href: "#features" },
        { label: "Pendekatan", href: "#story" },
        { label: "Kontak", href: "#cta" },
      ],
    },

    hero: {
      badge: "Software Agency untuk Produk & Sistem Modern",
      title: "Kami Bangun\nSoftware\nYang Tumbuh.",
      subtitle:
        "Kami membantu perusahaan merancang software yang cepat, stabil, dan mudah berkembang — tanpa kompleksitas yang tidak perlu.",
      cta: "Mulai Percakapan",
    },

    stories: [
      {
        id: "problem",
        tag: "Realita",
        title: "Banyak software terasa rumit bahkan sebelum digunakan.",
        description:
          "Sistem lambat, proses yang berulang, dan pengalaman pengguna yang membingungkan perlahan menghambat pertumbuhan bisnis. Teknologi seharusnya membantu tim bergerak lebih cepat — bukan sebaliknya.",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
        imageAlt: "Tim menghadapi sistem yang kompleks",
        align: "right",
      },

      {
        id: "transformation",
        tag: "Pendekatan",
        title: "Kami percaya software terbaik adalah yang terasa natural.",
        description:
          "Bukan sekadar tampilan yang indah, tetapi sistem yang benar-benar dipahami pengguna. Kami merancang pengalaman digital yang cepat, intuitif, dan menyenangkan digunakan setiap hari.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        imageAlt: "Ruang kerja modern dengan sistem data",
        align: "left",
      },

      {
        id: "outcome",
        tag: "Hasil",
        title: "Dibangun untuk bertahan dalam jangka panjang.",
        description:
          "Arsitektur yang bersih, performa yang konsisten, dan fondasi yang siap berkembang. Kami membangun software yang tetap nyaman digunakan bahkan ketika bisnis Anda tumbuh jauh lebih besar.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        imageAlt: "Dashboard data dan analitik",
        align: "right",
      },
    ],

    features: [
      {
        id: "architecture",
        icon: "◈",
        title: "Arsitektur Modern",
        description:
          "Fondasi sistem yang dirancang untuk performa, skalabilitas, dan kemudahan pengembangan jangka panjang.",
        highlight: true,
      },

      {
        id: "delivery",
        icon: "◎",
        title: "Pengembangan Cepat",
        description:
          "Iterasi yang terukur dan transparan agar produk dapat dirilis lebih cepat tanpa mengorbankan kualitas.",
      },

      {
        id: "integration",
        icon: "⬡",
        title: "Terhubung dengan Mudah",
        description:
          "Integrasi API, layanan pihak ketiga, dan sistem internal yang berjalan mulus dalam satu ekosistem.",
      },

      {
        id: "security",
        icon: "◉",
        title: "Keamanan Sejak Awal",
        description: "Keamanan bukan tambahan di akhir proyek. Kami membangunnya sejak tahap pertama pengembangan.",
        highlight: true,
      },

      {
        id: "ai",
        icon: "⬟",
        title: "Siap untuk AI",
        description: "Dirancang agar mudah berkembang dengan automasi, machine learning, dan teknologi AI modern.",
      },

      {
        id: "support",
        icon: "◐",
        title: "Tumbuh Bersama",
        description:
          "Kami tetap hadir setelah peluncuran — membantu produk Anda terus berkembang seiring bisnis bertumbuh.",
      },
    ],

    caseStudies: [
      {
        id: "logistics",
        client: "FreightFlow",
        title: "Platform Operasional Logistik",
        result:
          "Mengurangi proses manual dan mempercepat distribusi melalui sistem operasional yang terintegrasi penuh.",
        metric: "40%",
        metricLabel: "Efisiensi Operasional",
        tags: ["Logistik", "Otomasi", "Dashboard"],
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      },

      {
        id: "fintech",
        client: "ClearLedger",
        title: "Dashboard Finansial Real-Time",
        result:
          "Menyatukan data transaksi dari berbagai sumber menjadi satu pengalaman monitoring yang cepat dan presisi.",
        metric: "2 Juta+",
        metricLabel: "Transaksi per Hari",
        tags: ["Fintech", "Realtime", "Analytics"],
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      },

      {
        id: "health",
        client: "Meridian Health",
        title: "Sistem Digital Pelayanan Pasien",
        result:
          "Membantu tenaga medis bekerja lebih efisien dengan alur pelayanan yang lebih sederhana dan terotomasi.",
        metric: "62%",
        metricLabel: "Peningkatan Efisiensi",
        tags: ["Healthcare", "Automation", "UX"],
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      },
    ],

    cta: {
      title: "Teknologi yang baik terasa tidak terlihat.",
      subtitle:
        "Kami membantu perusahaan membangun software yang cepat, intuitif, dan siap berkembang untuk jangka panjang.",
      button: "Diskusikan Proyek",
      secondaryButton: "Lihat Hasil Kerja Kami",
    },

    footer: {
      tagline: "Dirancang dengan detail. Dibangun untuk berkembang.",
      links: [
        { label: "Privasi", href: "#" },
        { label: "Ketentuan", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
      ],
      copyright: `© ${new Date().getFullYear()} Paitonix. Seluruh hak cipta dilindungi.`,
    },
  };
}
