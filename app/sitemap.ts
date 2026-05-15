import { MetadataRoute } from "next";
import * as fs from "fs";
import * as path from "path";

type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt?: string;
};

function readBlogArticles(): BlogArticle[] {
  try {
    const dataFile = path.join(process.cwd(), ".blog-data.json");
    if (fs.existsSync(dataFile)) {
      const raw = fs.readFileSync(dataFile, "utf-8");
      const data = JSON.parse(raw) as Record<string, BlogArticle>;
      return Object.values(data).filter((article) => article.published);
    }
  } catch (error) {
    console.error("[sitemap] Failed to read blog articles:", error);
  }
  return [];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://paitonix.com";
  const today = new Date().toISOString().split("T")[0];

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  const articles = readBlogArticles();
  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: article.updatedAt || article.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
