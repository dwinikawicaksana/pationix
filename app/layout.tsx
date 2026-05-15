import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";

// Defer non-critical client-only UI so it doesn't bloat the initial JS bundle
// and harm LCP / TBT scores.
const LoadingScreen = dynamic(() => import("@/components/LoadingScreen"), {
  ssr: false,
});
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});
const SupportButton = dynamic(() => import("@/components/SupportButton"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paitonix.com"),
  title: {
    default:
      "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
    template: "%s | Paitonix",
  },
  description:
    "Paitonix adalah agency digital di Indonesia yang menghadirkan Web Development, Mobile Development, Digital Consultation, dan AI Solutions untuk bisnis lokal maupun internasional. Kami membangun produk digital yang scalable, modern, dan berdampak nyata.",
  keywords: [
    // Brand
    "Paitonix",
    "Paitonix Bali",
    "Paitonix Indonesia",

    // Local Bali SEO
    "jasa pembuatan website Bali",
    "jasa website Bali",
    "web developer Bali",
    "developer website Denpasar",
    "jasa aplikasi Bali",
    "software house Bali",
    "studio digital Bali",
    "jasa UI UX Bali",
    "jasa landing page Bali",
    "developer freelance Bali",
    "website bisnis Bali",
    "website hotel Bali",
    "website villa Bali",
    "website restoran Bali",
    "digital agency Bali",

    // Indonesia SEO
    "web development Indonesia",
    "software house Indonesia",
    "jasa developer website Indonesia",
    "jasa pembuatan aplikasi Indonesia",
    "AI developer Indonesia",
    "website development company Indonesia",
    "digital product studio Indonesia",

    // International SEO
    "Bali web development agency",
    "Indonesia web development agency",
    "web app development services",
    "custom website development",
    "AI solutions company",
    "mobile app development agency",
    "UI UX design studio",
    "startup product development",
    "SaaS development agency",
    "modern web applications",
    "full stack developer Indonesia",
    "remote software development team",

    // AI / Modern Era
    "AI products Bali",
    "AI website integration",
    "automation solutions",
    "smart business solutions",
    "next generation digital solutions",
    "AI-powered applications",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/?lang=en",
      id: "/?lang=id",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "https://paitonix.com",
    siteName: "Paitonix",
    title:
      "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
    description:
      "Agency digital Indonesia untuk Web Development, Mobile Development, Digital Consultation, dan AI Solutions. Kami membangun produk digital modern untuk bisnis lokal & internasional.",
    images: [
      {
        url: "/assets/images/og-meta.png",
        width: 1200,
        height: 630,
        alt: "Paitonix — Web Development, Mobile & AI Solutions Indonesia",
      },
    ],
    locale: "id_ID",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@paitonix",
    title:
      "Paitonix — Web Development, Mobile Development & AI Solutions Indonesia",
    description:
      "Agency digital Indonesia: Web Development, Mobile Development, Digital Consultation & AI Solutions untuk bisnis lokal & global.",
    images: ["/assets/images/og-meta.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="icon" href="/assets/images/favicon.png" type="image/png" />
        <link
          rel="apple-touch-icon"
          href="/assets/images/favicon.png"
          type="image/png"
        />
        <meta name="theme-color" content="#0f4b82" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t?t==='dark':d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
        {/* Structured data: Organization + WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://paitonix.com/#organization",
                  name: "Paitonix",
                  url: "https://paitonix.com",
                  logo: "https://paitonix.com/assets/images/logo-black-transparent.png",
                  description:
                    "Agency digital di Indonesia — Web Development, Mobile Development, Digital Consultation, dan AI Solutions untuk bisnis lokal maupun internasional.",
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: "ID",
                  },
                  areaServed: ["Indonesia", "Worldwide"],
                  sameAs: ["https://twitter.com/paitonix"],
                },
                {
                  "@type": "WebSite",
                  "@id": "https://paitonix.com/#website",
                  url: "https://paitonix.com",
                  name: "Paitonix",
                  publisher: { "@id": "https://paitonix.com/#organization" },
                  inLanguage: ["en", "id"],
                  potentialAction: {
                    "@type": "SearchAction",
                    target: "https://paitonix.com/blog?q={search_term_string}",
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="font-inter antialiased overflow-x-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
        {/* Global audio element for welcome voice */}
        <audio
          id="welcome-audio"
          src="/assets/audio/welcome-voice.mp3"
          preload="none"
          muted
          playsInline
        />
        {/* Welcome audio is fully gated behind first user interaction to avoid LCP/TBT penalties. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  if(typeof window==='undefined')return;
  var played=false;
  function init(){
    if(played)return;played=true;
    var a=document.getElementById('welcome-audio');
    if(!a){a=new Audio('/assets/audio/welcome-voice.mp3');a.id='welcome-audio-js';document.body&&document.body.appendChild(a);}
    a.muted=true;a.volume=0;a.playbackRate=0.75;
    var p=a.play();
    if(p)p.then(function(){window.__audioStarted=true;}).catch(function(){window.__audioStarted=false;});
    window.__welcomeAudio=a;
  }
  ['pointerdown','keydown','touchstart','scroll'].forEach(function(ev){
    window.addEventListener(ev,init,{once:true,passive:true});
  });
})()`,
          }}
        />
        <LanguageProvider>
          <LoadingScreen />
          <ScrollToTop />
          {children}
          <SupportButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
