"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: number;
  language: string;
  published: boolean;
  createdAt: Date | string;
  featuredImage?: string;
  keywords?: string[];
  tags?: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Fetch article via API
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/blog/article/${slug}`);

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Failed to fetch article: ${errorData.error}`);
          setIsLoading(false);
          return;
        }

        const data = await response.json();
        setArticle(data as Article);
      } catch (error) {
        console.error("Error loading article:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  // SEO: inject canonical link + Article JSON-LD for the current slug.
  useEffect(() => {
    if (!article) return;
    const canonicalHref = `https://paitonix.com/blog/${article.slug}`;
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonicalHref;

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.dataset.seo = "article-jsonld";
    ld.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalHref },
      headline: article.title,
      description: article.excerpt,
      image: article.featuredImage
        ? [article.featuredImage]
        : ["https://paitonix.com/assets/images/meta-img.png"],
      datePublished: new Date(article.createdAt).toISOString(),
      dateModified: new Date(article.createdAt).toISOString(),
      inLanguage: article.language,
      keywords: (article.keywords || []).join(", "),
      articleSection: article.category,
      author: { "@type": "Organization", name: "Paitonix" },
      publisher: {
        "@type": "Organization",
        name: "Paitonix",
        logo: {
          "@type": "ImageObject",
          url: "https://paitonix.com/assets/images/logo-black-transparent.png",
        },
      },
    });
    document.head.appendChild(ld);
    document.title = `${article.title} — Paitonix Blog`;

    return () => {
      const stale = document.head.querySelector(
        'script[data-seo="article-jsonld"]',
      );
      if (stale) stale.remove();
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-slate-700 border-t-sky-500 rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-black text-white mb-4">
            {language === "id"
              ? "Artikel Tidak Ditemukan"
              : "Article Not Found"}
          </h1>
          <p className="text-slate-400 mb-8">
            {language === "id"
              ? "Maaf, artikel yang Anda cari tidak ada."
              : "Sorry, the article you're looking for doesn't exist."}
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            ← {language === "id" ? "Kembali ke Blog" : "Back to Blog"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-6">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 mb-6 transition"
            >
              <span>←</span>
              <span className="text-sm font-semibold">
                {language === "id" ? "Kembali ke Blog" : "Back to Blog"}
              </span>
            </Link>

            <div className="mb-8">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-semibold">
                  {article.category}
                </span>
                <span className="text-sm text-slate-400">
                  {article.readTime}{" "}
                  {language === "id" ? "menit baca" : "min read"}
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6">
                {article.title}
              </h1>

              <p className="text-lg text-slate-300 mb-6">{article.excerpt}</p>

              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span>
                  {new Date(article.createdAt).toLocaleDateString(
                    language === "id" ? "id-ID" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    },
                  )}
                </span>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="rounded-2xl overflow-hidden border border-slate-700 mb-12">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 sm:py-16 px-6 border-t border-slate-800">
        <div className="max-w-3xl mx-auto">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert max-w-none text-justify hyphens-auto [&_p]:!text-justify [&_li]:!text-justify [&_blockquote]:!text-justify"
            dangerouslySetInnerHTML={{
              __html: convertMarkdownToHTML(article.content),
            }}
          />

          {/* Keywords */}
          {article.keywords && article.keywords.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate-700">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">
                {language === "id" ? "Kata Kunci" : "Keywords"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.keywords.map((keyword, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-slate-900/50 border border-slate-700 text-sm text-slate-300"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SEO Hashtags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mt-8 pt-8 border-t border-slate-800">
              <h3 className="text-sm font-semibold text-slate-300 mb-4">
                {language === "id" ? "Tagar SEO" : "SEO Hashtags"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sm font-medium text-sky-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Articles or CTA */}
      <section className="py-20 sm:py-28 px-6 border-t border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {language === "id"
              ? "Siap untuk project berikutnya?"
              : "Ready for your next project?"}
          </h2>
          <p className="text-base text-slate-400 mb-8">
            {language === "id"
              ? "Hubungi kami untuk konsultasi gratis dan penawaran khusus."
              : "Contact us for free consultation and special offers."}
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=6287891541475&text=Halo%20saya%20ingin%20konsultasi%20dalam%20pembuatan%20jasa%20website"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-sky-500 text-white font-semibold hover:bg-sky-600 transition"
          >
            {language === "id" ? "Hubungi Kami" : "Contact Us"}
          </a>
        </motion.div>
      </section>
    </main>
  );
}

/**
 * Convert Markdown to HTML with basic formatting
 */
function convertMarkdownToHTML(markdown: string): string {
  let html = markdown;

  // Headers
  html = html.replace(
    /^### (.*?)$/gm,
    "<h3 className='text-2xl font-bold text-white my-6'>$1</h3>",
  );
  html = html.replace(
    /^## (.*?)$/gm,
    "<h2 className='text-3xl font-bold text-white my-8'>$1</h2>",
  );
  html = html.replace(
    /^# (.*?)$/gm,
    "<h1 className='text-4xl font-bold text-white my-10'>$1</h1>",
  );

  // Bold
  html = html.replace(
    /\*\*(.*?)\*\*/g,
    "<strong className='font-bold text-white'>$1</strong>",
  );

  // Italic
  html = html.replace(/\*(.*?)\*/g, "<em className='italic'>$1</em>");

  // Code blocks - use [\s\S] instead of /s flag for better browser compatibility
  html = html.replace(
    /```([\s\S]*?)```/g,
    "<pre className='bg-slate-900 rounded-lg p-4 my-6 overflow-x-auto'><code className='text-slate-300'>$1</code></pre>",
  );

  // Inline code
  html = html.replace(
    /`(.*?)`/g,
    "<code className='bg-slate-900 rounded px-2 py-1 text-sky-300 font-mono text-sm'>$1</code>",
  );

  // Links
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    "<a href='$2' className='text-sky-400 hover:text-sky-300 underline' target='_blank' rel='noopener noreferrer'>$1</a>",
  );

  // Images
  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    "<img src='$2' alt='$1' className='w-full rounded-lg shadow-lg my-6' />",
  );

  // Paragraphs
  html = html
    .split("\n\n")
    .map((para) => {
      if (!para.match(/^<[hpu]/)) {
        return `<p className='text-slate-300 leading-relaxed my-4'>${para}</p>`;
      }
      return para;
    })
    .join("");

  // Lists
  html = html.replace(
    /^- (.*?)$/gm,
    "<li className='text-slate-300 ml-4'>$1</li>",
  );
  html = html.replace(
    /(<li[\s\S]*?<\/li>)/g,
    "<ul className='list-disc space-y-2 my-4'>$1</ul>",
  );

  return html;
}
