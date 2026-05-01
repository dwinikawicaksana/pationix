import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Paitonix Agency — Software yang Tumbuh Bersama Bisnis Anda",
  description:
    "Kami merancang sistem perangkat lunak enterprise. Dari ide hingga peluncuran — dibangun untuk skala, kecepatan, dan pertumbuhan jangka panjang.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme'),d=window.matchMedia('(prefers-color-scheme:dark)').matches;if(t?t==='dark':d)document.documentElement.classList.add('dark')}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className="antialiased bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-300"
        style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
