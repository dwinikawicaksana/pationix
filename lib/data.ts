import { LandingData } from "@/types/landing";

export function getLandingData(): LandingData {
  return {
    navbar: {
      logo: "Paitonix",
      links: [
        { label: { id: "Produk Kami", en: "Our Product" }, href: "#projects" },
        { label: { id: "Layanan", en: "Services" }, href: "#services" },
        { label: { id: "Blog", en: "Blog" }, href: "/blog" },
        { label: { id: "Tentang Kami", en: "About Us" }, href: "#story" },
        { label: { id: "Kontak", en: "Contact" }, href: "#cta" },
      ],
    },

    hero: {
      badge: {
        id: "Studio Digital untuk Platform & Sistem Modern",
        en: "Digital product studio for modern platforms & systems",
      },
      title: {
        id: "Temukan Ruang Anda\nDalam Definisi Baru.",
        en: "Discover Your Space\nRedefined.",
      },
      subtitle: {
        id: "Solusi digital lengkap: landing page, web app, dan chatbot AI dalam satu pengalaman yang kohesif.",
        en: "A complete digital solution: landing page, web app, and AI chatbot in one cohesive experience.",
      },
      cta: { id: "Mulai Percakapan", en: "Start the Conversation" },
    },

    stories: [
      {
        id: "problem",
        tag: { id: "Realita", en: "Reality" },
        title: {
          id: "Banyak software terasa rumit bahkan sebelum digunakan.",
          en: "Many products feel complex before you even start.",
        },
        description: {
          id: "Sistem lambat, proses yang berulang, dan pengalaman pengguna yang membingungkan perlahan menghambat pertumbuhan bisnis. Teknologi seharusnya membantu tim bergerak lebih cepat — bukan sebaliknya.",
          en: "Slow systems, repetitive workflows, and confusing UX gradually slow business growth. Technology should help teams move faster — not hold them back.",
        },
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=80",
        imageAlt: "Team facing a complex system",
        align: "right",
      },

      {
        id: "transformation",
        tag: { id: "Pendekatan", en: "Approach" },
        title: {
          id: "Kami percaya software terbaik adalah yang terasa natural.",
          en: "We believe the best software feels natural.",
        },
        description: {
          id: "Bukan sekadar tampilan yang indah, tetapi sistem yang benar-benar dipahami pengguna. Kami merancang pengalaman digital yang cepat, intuitif, dan menyenangkan digunakan setiap hari.",
          en: "Not just beautiful visuals, but systems that users truly understand. We design digital experiences that are fast, intuitive, and delightful every day.",
        },
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
        imageAlt: "Modern workspace with data systems",
        align: "left",
      },

      {
        id: "outcome",
        tag: { id: "Hasil", en: "Outcome" },
        title: {
          id: "Dibangun untuk bertahan dalam jangka panjang.",
          en: "Built to last in the long run.",
        },
        description: {
          id: "Arsitektur yang bersih, performa yang konsisten, dan fondasi yang siap berkembang. Kami membangun software yang tetap nyaman digunakan bahkan ketika bisnis Anda tumbuh jauh lebih besar.",
          en: "Clean architecture, consistent performance, and a foundation ready to grow. We build software that stays comfortable even as your business scales.",
        },
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
        imageAlt: "Analytics dashboard",
        align: "right",
      },
    ],

    features: [
      {
        id: "architecture",
        icon: "◈",
        title: { id: "Arsitektur Modern", en: "Modern Architecture" },
        description: {
          id: "Fondasi sistem yang dirancang untuk performa, skalabilitas, dan kemudahan pengembangan jangka panjang.",
          en: "A system foundation designed for performance, scalability, and long-term development ease.",
        },
        highlight: true,
      },

      {
        id: "delivery",
        icon: "◎",
        title: { id: "Pengembangan Cepat", en: "Fast Delivery" },
        description: {
          id: "Iterasi yang terukur dan transparan agar produk dapat dirilis lebih cepat tanpa mengorbankan kualitas.",
          en: "Measured, transparent iterations so products ship faster without sacrificing quality.",
        },
      },

      {
        id: "integration",
        icon: "⬡",
        title: { id: "Terhubung dengan Mudah", en: "Effortless Integration" },
        description: {
          id: "Integrasi API, layanan pihak ketiga, dan sistem internal yang berjalan mulus dalam satu ekosistem.",
          en: "API, third-party, and internal systems working seamlessly in one ecosystem.",
        },
      },

      {
        id: "security",
        icon: "◉",
        title: { id: "Keamanan Sejak Awal", en: "Security from Day One" },
        description: {
          id: "Keamanan bukan tambahan di akhir proyek. Kami membangunnya sejak tahap pertama pengembangan.",
          en: "Security isn’t an afterthought. We build it in from the first development phase.",
        },
        highlight: true,
      },

      {
        id: "ai",
        icon: "⬟",
        title: { id: "Siap untuk AI", en: "AI Ready" },
        description: {
          id: "Dirancang agar mudah berkembang dengan automasi, machine learning, dan teknologi AI modern.",
          en: "Designed to grow with automation, machine learning, and modern AI technologies.",
        },
      },

      {
        id: "support",
        icon: "◐",
        title: { id: "Tumbuh Bersama", en: "Grow Together" },
        description: {
          id: "Kami tetap hadir setelah peluncuran — membantu produk Anda terus berkembang seiring bisnis bertumbuh.",
          en: "We stay by your side after launch — helping your product evolve as your business grows.",
        },
      },
    ],

    caseStudies: [
      {
        id: "logistics",
        client: "FreightFlow",
        title: {
          id: "Platform Operasional Logistik",
          en: "Logistics Operations Platform",
        },
        result: {
          id: "Mengurangi proses manual dan mempercepat distribusi melalui sistem operasional yang terintegrasi penuh.",
          en: "Reduced manual steps and accelerated delivery through a fully integrated operations system.",
        },
        metric: "40%",
        metricLabel: {
          id: "Efisiensi Operasional",
          en: "Operational Efficiency",
        },
        tags: [
          { id: "Logistik", en: "Logistics" },
          { id: "Otomasi", en: "Automation" },
          { id: "Dashboard", en: "Dashboard" },
        ],
        image:
          "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80",
      },

      {
        id: "fintech",
        client: "ClearLedger",
        title: {
          id: "Dashboard Finansial Real-Time",
          en: "Real-Time Finance Dashboard",
        },
        result: {
          id: "Menyatukan data transaksi dari berbagai sumber menjadi satu pengalaman monitoring yang cepat dan presisi.",
          en: "Consolidated transaction data from multiple sources into one fast, precise monitoring experience.",
        },
        metric: "2 Juta+",
        metricLabel: { id: "Transaksi per Hari", en: "Transactions per Day" },
        tags: [
          { id: "Fintech", en: "Fintech" },
          { id: "Realtime", en: "Realtime" },
          { id: "Analytics", en: "Analytics" },
        ],
        image:
          "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80",
      },

      {
        id: "health",
        client: "Meridian Health",
        title: {
          id: "Sistem Digital Pelayanan Pasien",
          en: "Digital Patient Care System",
        },
        result: {
          id: "Membantu tenaga medis bekerja lebih efisien dengan alur pelayanan yang lebih sederhana dan terotomasi.",
          en: "Helped medical staff work more efficiently with simpler, automated care workflows.",
        },
        metric: "62%",
        metricLabel: { id: "Peningkatan Efisiensi", en: "Efficiency Gain" },
        tags: [
          { id: "Healthcare", en: "Healthcare" },
          { id: "Automation", en: "Automation" },
          { id: "UX", en: "UX" },
        ],
        image:
          "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
      },
    ],

    blogs: [],

    cta: {
      title: {
        id: "Teknologi yang baik terasa tidak terlihat.",
        en: "Good technology feels invisible.",
      },
      subtitle: {
        id: "Kami membantu perusahaan membangun software yang cepat, intuitif, dan siap berkembang untuk jangka panjang.",
        en: "We help companies build software that is fast, intuitive, and built to grow over time.",
      },
      button: { id: "Diskusikan Proyek", en: "Discuss Your Project" },
      secondaryButton: { id: "Lihat Hasil Kerja Kami", en: "See Our Work" },
    },

    footer: {
      tagline: {
        id: "Dirancang dengan detail. Dibangun untuk berkembang.",
        en: "Designed with detail. Built to grow.",
      },
      description: {
        id: "Dirancang dengan presisi untuk produk dan aplikasi startup modern.",
        en: "Designed with precision for modern startup products and applications.",
      },
      links: [
        { label: { id: "Privasi", en: "Privacy" }, href: "#" },
        { label: { id: "Ketentuan", en: "Terms" }, href: "#" },
        { label: { id: "LinkedIn", en: "LinkedIn" }, href: "#" },
        { label: { id: "Instagram", en: "Instagram" }, href: "#" },
      ],
      copyright: `© ${new Date().getFullYear()} Paitonix. Seluruh hak cipta dilindungi.`,
    },
  };
}

export const projects = {
  aksara: {
    id: "aksara",
    title: { id: "Aksara", en: "Aksara" },
    logo: "/assets/images/project-logo/aksara-logo.png",
    tagline: {
      id: "Platform Kolaborasi & Monitoring Proyek",
      en: "Collaboration & Project Monitoring Platform",
    },
    heroDescription: {
      id: "Sistem terpadu untuk mengelola MVP, jadwal meeting, dokumen arsip, evaluasi proyek, dan pengaturan akun dengan antarmuka yang intuitif dan responsif.",
      en: "A unified system for managing MVPs, meeting schedules, archived documents, project evaluation, and account settings with an intuitive and responsive interface.",
    },
    sections: [
      {
        type: "text-image",
        title: { id: "Dashboard Central", en: "Central Dashboard" },
        description: {
          id: "Lihat semua data penting proyek dalam satu tampilan yang terorganisir dengan baik. Pantau progress, deadline, dan status kolaborasi tim secara real-time.",
          en: "View all important project data in one well-organized view. Monitor progress, deadlines, and team collaboration status in real-time.",
        },
        image: "/assets/images/aksara-prototype.svg",
        align: "right",
      },
      {
        type: "features-grid",
        title: { id: "Fitur Utama", en: "Key Features" },
        features: [
          {
            title: { id: "MVP Management", en: "MVP Management" },
            description: {
              id: "Kelola siklus MVP dari konsep hingga peluncuran dengan tracking yang detail.",
              en: "Manage MVP lifecycle from concept to launch with detailed tracking.",
            },
          },
          {
            title: { id: "Meeting Scheduler", en: "Meeting Scheduler" },
            description: {
              id: "Jadwalkan meeting, set reminder, dan simpan notes dalam satu tempat.",
              en: "Schedule meetings, set reminders, and save notes in one place.",
            },
          },
          {
            title: { id: "Document Archive", en: "Document Archive" },
            description: {
              id: "Arsipkan dokumen penting dengan sistem tagging dan pencarian yang canggih.",
              en: "Archive important documents with advanced tagging and search system.",
            },
          },
          {
            title: { id: "Project Evaluation", en: "Project Evaluation" },
            description: {
              id: "Evaluasi kinerja proyek dengan metrik yang terukur dan laporan komprehensif.",
              en: "Evaluate project performance with measurable metrics and comprehensive reports.",
            },
          },
          {
            title: { id: "Team Collaboration", en: "Team Collaboration" },
            description: {
              id: "Kolaborasi tim yang seamless dengan comment, mention, dan real-time update.",
              en: "Seamless team collaboration with comments, mentions, and real-time updates.",
            },
          },
          {
            title: { id: "Account Settings", en: "Account Settings" },
            description: {
              id: "Atur preferensi tim, permissions, dan integrasi dengan tools favorit Anda.",
              en: "Configure team preferences, permissions, and integrations with your favorite tools.",
            },
          },
        ],
      },
    ],
    cta: {
      title: {
        id: "Siap Mengoptimalkan Kolaborasi Proyek?",
        en: "Ready to Optimize Project Collaboration?",
      },
      description: {
        id: "Hubungi tim kami untuk demo lengkap dan konsultasi implementasi Aksara di organisasi Anda.",
        en: "Contact our team for a full demo and implementation consultation for Aksara in your organization.",
      },
    },
  },
  nexfit: {
    id: "nexfit",
    title: { id: "Nexfit", en: "Nexfit" },
    logo: "/assets/images/project-logo/nexfit-logo.png",
    tagline: {
      id: "Platform Manajemen Kesehatan & Gym Modern",
      en: "Modern Health & Gym Management Platform",
    },
    heroDescription: {
      id: "Solusi lengkap untuk pemilik gym: kelola check-in member, booking kelas, data member, tools trainer, dan insight kesehatan - semua dalam satu dashboard elegan.",
      en: "A complete solution for gym owners: manage member check-ins, class bookings, member data, trainer tools, and health insights - all in one elegant dashboard.",
    },
    sections: [
      {
        type: "text-image",
        title: { id: "Manajemen Member", en: "Member Management" },
        description: {
          id: "Kelola data member dengan lengkap, dari profil kesehatan hingga history membership. Track progress kesehatan dan engagement dengan insights yang actionable.",
          en: "Manage complete member data, from health profiles to membership history. Track health progress and engagement with actionable insights.",
        },
        image: "/assets/images/fitnex-prototype.svg",
        align: "left",
      },
      {
        type: "features-grid",
        title: { id: "Fitur Unggulan", en: "Premium Features" },
        features: [
          {
            title: { id: "Smart Check-in", en: "Smart Check-in" },
            description: {
              id: "Sistem check-in yang cepat dengan QR code, recognisi wajah, atau card membership.",
              en: "Fast check-in system with QR code, facial recognition, or membership card.",
            },
          },
          {
            title: { id: "Class Booking", en: "Class Booking" },
            description: {
              id: "Booking kelas yang mudah dengan notifikasi dan reminder otomatis untuk member.",
              en: "Easy class booking with automatic notifications and reminders for members.",
            },
          },
          {
            title: { id: "Member Insights", en: "Member Insights" },
            description: {
              id: "Dashboard analytics lengkap untuk membuat keputusan bisnis yang lebih baik.",
              en: "Complete analytics dashboard to make better business decisions.",
            },
          },
          {
            title: { id: "Trainer Tools", en: "Trainer Tools" },
            description: {
              id: "Tools untuk trainer: program design, progress tracking, dan komunikasi dengan member.",
              en: "Tools for trainers: program design, progress tracking, and member communication.",
            },
          },
          {
            title: { id: "Health Monitoring", en: "Health Monitoring" },
            description: {
              id: "Monitor kesehatan member dengan integrasi wearable dan IoT devices.",
              en: "Monitor member health with wearable and IoT device integration.",
            },
          },
          {
            title: { id: "Billing & Payment", en: "Billing & Payment" },
            description: {
              id: "Kelola membership, invoicing, dan payment dengan sistem yang reliable dan aman.",
              en: "Manage memberships, invoicing, and payments with a reliable and secure system.",
            },
          },
        ],
      },
    ],
    cta: {
      title: {
        id: "Transformasi Gym Anda dengan Fitnex",
        en: "Transform Your Gym with Fitnex",
      },
      description: {
        id: "Bergabunglah dengan puluhan gym yang telah meningkatkan efisiensi operasional mereka dengan Fitnex. Hubungi kami hari ini untuk penawaran khusus.",
        en: "Join dozens of gyms that have improved their operational efficiency with Fitnex. Contact us today for a special offer.",
      },
    },
  },
  noura: {
    id: "noura",
    title: { id: "Noura Care", en: "Noura Care" },
    logo: "/assets/images/project-logo/noura-logo.png",
    tagline: {
      id: "Platform Booking Healthcare & Appointment Modern",
      en: "Modern Healthcare & Appointment Booking Platform",
    },
    heroDescription: {
      id: "Solusi lengkap untuk klinik kecil dan layanan home service: kelola jadwal appointment, profil pasien, reminder otomatis, dan insights yang actionable.",
      en: "A complete solution for small clinics and home services: manage appointment schedules, patient profiles, automatic reminders, and actionable insights.",
    },
    sections: [
      {
        type: "text-image",
        title: { id: "Manajemen Appointment", en: "Appointment Management" },
        description: {
          id: "Kelola jadwal appointment dengan mudah. Pasien dapat booking melalui portal online, dan sistem akan mengirim reminder otomatis sebelum appointment.",
          en: "Manage appointment schedules easily. Patients can book through the online portal, and the system sends automatic reminders before appointments.",
        },
        image: "/assets/images/noura-management.svg",
        align: "left",
      },
      {
        type: "features-grid",
        title: { id: "Fitur Unggulan", en: "Premium Features" },
        features: [
          {
            title: { id: "Online Booking", en: "Online Booking" },
            description: {
              id: "Portal booking untuk pasien dengan kalender yang intuitif dan real-time availability.",
              en: "Patient booking portal with intuitive calendar and real-time availability.",
            },
          },
          {
            title: { id: "Patient Profiles", en: "Patient Profiles" },
            description: {
              id: "Kelola data lengkap pasien: riwayat medis, kontak, dan preferensi treatment.",
              en: "Manage complete patient data: medical history, contact info, and treatment preferences.",
            },
          },
          {
            title: { id: "Automatic Reminders", en: "Automatic Reminders" },
            description: {
              id: "Sistem reminder otomatis via SMS atau email untuk mengurangi no-show.",
              en: "Automatic reminder system via SMS or email to reduce no-shows.",
            },
          },
          {
            title: {
              id: "Multi-Provider Support",
              en: "Multi-Provider Support",
            },
            description: {
              id: "Support untuk multiple dokter/praktisi dengan calendar management individual.",
              en: "Support for multiple doctors/practitioners with individual calendar management.",
            },
          },
          {
            title: { id: "Notes & Records", en: "Notes & Records" },
            description: {
              id: "Dokumentasi lengkap setiap appointment dan treatment history pasien.",
              en: "Complete documentation of each appointment and patient treatment history.",
            },
          },
          {
            title: { id: "Mobile Friendly", en: "Mobile Friendly" },
            description: {
              id: "Aplikasi mobile dan web yang responsive untuk kemudahan akses kapan saja.",
              en: "Mobile app and responsive web for easy access anytime, anywhere.",
            },
          },
        ],
      },
    ],
    cta: {
      title: {
        id: "Tingkatkan Efisiensi Klinik Anda dengan Noura Care",
        en: "Elevate Your Clinic Efficiency with Noura Care",
      },
      description: {
        id: "Optimalkan manajemen appointment dan tingkatkan kepuasan pasien dengan Noura Care. Hubungi kami untuk demo dan penawaran khusus.",
        en: "Optimize appointment management and improve patient satisfaction with Noura Care. Contact us for a demo and special offer.",
      },
    },
  },
  "bare-beaute": {
    id: "bare-beaute",
    title: { id: "Bare Beaute Studio", en: "Bare Beaute Studio" },
    logo: "/assets/images/project-logo/bare-beaute-logo.png.jpg",
    tagline: {
      id: "Sistem UMKM Beauty & Salon Management",
      en: "SMB Beauty & Salon Management System",
    },
    heroDescription: {
      id: "Solusi khusus untuk salon dan nail art: kelola appointment, kas harian, stok kosmetik, staff management, dan laporan bulanan dalam satu sistem terintegrasi.",
      en: "A specialized solution for salons and nail art: manage appointments, daily cash, cosmetic stock, staff management, and monthly reports in one integrated system.",
    },
    sections: [
      {
        type: "text-image",
        title: {
          id: "Manajemen Appointment & Booking",
          en: "Appointment & Booking Management",
        },
        description: {
          id: "Kelola jadwal stylist, booking client, dan riwayat layanan dengan sistem yang user-friendly dan efisien.",
          en: "Manage stylist schedules, client bookings, and service history with a user-friendly and efficient system.",
        },
        image: "/assets/images/beaute-booking.svg",
        align: "left",
      },
      {
        type: "features-grid",
        title: { id: "Fitur Unggulan", en: "Premium Features" },
        features: [
          {
            title: {
              id: "Appointment Scheduling",
              en: "Appointment Scheduling",
            },
            description: {
              id: "Calendar management yang intuitif untuk multiple stylist dan treatment types.",
              en: "Intuitive calendar management for multiple stylists and treatment types.",
            },
          },
          {
            title: { id: "Stock Management", en: "Stock Management" },
            description: {
              id: "Tracking stok kosmetik dan supplies dengan automatic reorder alerts.",
              en: "Track cosmetic and supply stock with automatic reorder alerts.",
            },
          },
          {
            title: { id: "Daily Cash Management", en: "Daily Cash Management" },
            description: {
              id: "Pencatatan kas harian, payment methods, dan daily settlement reporting.",
              en: "Daily cash recording, payment method tracking, and settlement reporting.",
            },
          },
          {
            title: { id: "Staff Management", en: "Staff Management" },
            description: {
              id: "Kelola data staff, komisi, attendance, dan performance tracking.",
              en: "Manage staff data, commissions, attendance, and performance tracking.",
            },
          },
          {
            title: { id: "Client Database", en: "Client Database" },
            description: {
              id: "Simpan preferensi client, service history, dan contact information.",
              en: "Store client preferences, service history, and contact information.",
            },
          },
          {
            title: { id: "Monthly Reports", en: "Monthly Reports" },
            description: {
              id: "Generate laporan bulanan untuk revenue, staff performance, dan stock analysis.",
              en: "Generate monthly reports for revenue, staff performance, and stock analysis.",
            },
          },
        ],
      },
    ],
    cta: {
      title: {
        id: "Kelola Salon Anda dengan Bare Beaute",
        en: "Manage Your Salon with Bare Beaute",
      },
      description: {
        id: "Tingkatkan efisiensi operasional salon Anda dengan sistem manajemen yang komprehensif. Hubungi kami untuk demo dan konsultasi implementasi.",
        en: "Increase your salon's operational efficiency with a comprehensive management system. Contact us for a demo and implementation consultation.",
      },
    },
  },
};
