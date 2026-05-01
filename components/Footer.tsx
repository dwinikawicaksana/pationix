import { FooterData, NavbarData } from "@/types/landing";

export default function Footer({ footer, navbar }: { footer: FooterData; navbar: NavbarData }) {
  return (
    <footer className="border-t border-zinc-100 dark:border-zinc-800/60">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div
              className="text-[1.4rem] font-black tracking-[-0.05em] text-zinc-900 dark:text-zinc-50 mb-1.5"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {navbar.logo}
            </div>
            <p className="text-[13px] text-zinc-400 dark:text-zinc-500">{footer.tagline}</p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {footer.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-10 pt-5 border-t border-zinc-100 dark:border-zinc-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <p className="text-[12px] text-zinc-400 dark:text-zinc-600">{footer.copyright}</p>
          <p className="text-[12px] text-zinc-400 dark:text-zinc-600">Dirancang dengan presisi.</p>
        </div>
      </div>
    </footer>
  );
}
