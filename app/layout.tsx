import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import SupportButton from "@/components/SupportButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://paitonix.com"),
  title: "Paitonix — Digital Product Studio",
  description:
    "Paitonix builds powerful websites, scalable mobile apps, and AI-powered products for businesses ready to grow in the modern digital era.",
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
    title: "Paitonix — Digital Product Studio",
    description:
      "Paitonix builds powerful websites, scalable mobile apps, and AI-powered products for businesses ready to grow in the modern digital era.",
    images: [
      {
        url: "/assets/images/meta-img.png",
        width: 1200,
        height: 630,
        alt: "Paitonix — Digital Product Studio",
      },
    ],
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    site: "@paitonix",
    title: "Paitonix — Digital Product Studio",
    description:
      "Paitonix builds powerful websites, scalable mobile apps, and AI-powered products for businesses ready to grow in the modern digital era.",
    images: ["/assets/images/meta-img.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
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
      <body
        className="antialiased overflow-x-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        {/* Global audio element for welcome voice */}
        <audio
          id="welcome-audio"
          src="/assets/audio/welcome-voice.mp3"
          preload="auto"
          autoPlay
          muted
          playsInline
        />
        {/* Start audio muted as early as possible — bypasses autoplay policy */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var a=document.getElementById('welcome-audio');
  if(!a){a=new Audio('/assets/audio/welcome-voice.mp3');a.id='welcome-audio-js';document.body&&document.body.appendChild(a);}
  a.muted=true;a.volume=0;a.playbackRate=0.75;
  var p=a.play();
  if(p)p.then(function(){window.__audioStarted=true;}).catch(function(){window.__audioStarted=false;});
  window.__welcomeAudio=a;
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
