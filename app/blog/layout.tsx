import { Metadata, ResolvingMetadata } from "next";
import * as fs from "fs";
import * as path from "path";

type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
  createdAt: string;
  featuredImage?: string;
  keywords?: string[];
  category?: string;
  language?: string;
};

function readBlogArticles(): Map<string, BlogArticle> {
  try {
    const dataFile = path.join(process.cwd(), ".blog-data.json");
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, "utf-8");
      const data = JSON.parse(raw) as Record<string, BlogArticle>;
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error("[blog-layout] Failed to read blog articles:", error);
  }
  return new Map();
}

type BlogLayoutProps = {
  children: React.ReactNode;
  params: { slug?: string };
};

export async function generateMetadata(
  { params }: BlogLayoutProps,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const baseUrl = "https://paitonix.com";
  const parentMetadata = await parent;

  // If no slug, return blog listing metadata
  if (!params.slug) {
    return {
      title: "Blog — Paitonix",
      description:
        "Read articles about digital product design, web development, mobile apps, and AI-powered solutions from Paitonix.",
      alternates: { canonical: `${baseUrl}/blog` },
      openGraph: {
        type: "website",
        url: `${baseUrl}/blog`,
        title: "Blog — Paitonix",
        description:
          "Read articles about digital product design, web development, mobile apps, and AI-powered solutions from Paitonix.",
        siteName: "Paitonix",
        images: [
          {
            url: "/assets/images/meta-img.png",
            width: 1200,
            height: 630,
            alt: "Paitonix Blog",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Blog — Paitonix",
        description:
          "Read articles about digital product design, web development, mobile apps, and AI-powered solutions from Paitonix.",
        images: ["/assets/images/meta-img.png"],
      },
    };
  }

  // For individual blog posts
  const slug = params.slug as string;
  const articles = readBlogArticles();
  const article = Array.from(articles.values()).find((a) => a.slug === slug);

  if (!article || !article.published) {
    return {
      title: "Article Not Found — Paitonix Blog",
      description: "The article you are looking for does not exist.",
    };
  }

  const articleUrl = `${baseUrl}/blog/${article.slug}`;
  const ogImage = article.featuredImage || "/assets/images/meta-img.png";
  const keywords =
    article.keywords && article.keywords.length > 0
      ? article.keywords.join(", ")
      : "paitonix, blog, digital products";

  return {
    title: `${article.title} — Paitonix Blog`,
    description: article.excerpt,
    keywords,
    alternates: { canonical: articleUrl },
    authors: [{ name: "Paitonix" }],
    openGraph: {
      type: "article",
      url: articleUrl,
      title: article.title,
      description: article.excerpt,
      siteName: "Paitonix",
      publishedTime: new Date(article.createdAt).toISOString(),
      authors: ["Paitonix"],
      tags: article.keywords || [],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [ogImage],
      creator: "@paitonix",
    },
  };
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  return children;
}
