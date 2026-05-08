import type { Metadata } from "next";
import "./globals.css";
import LanguageProvider from "@/components/LanguageProvider";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollToTop from "@/components/ScrollToTop";
import AutoScrollButton from "@/components/AutoScrollButton";

export const metadata: Metadata = {
  title: "Paitonix — Landing page untuk startup web dan app",
  description:
    "Paitonix merancang landing page modern, UI aplikasi, dan chatbot cerdas untuk startup yang siap tumbuh.",
  icons: {
    icon: "/assets/images/favicon.png",
    shortcut: "/assets/images/favicon.png",
    apple: "/assets/images/favicon.png",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t?t==='dark':d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
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
          <AutoScrollButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
