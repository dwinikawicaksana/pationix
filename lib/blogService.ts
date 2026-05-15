import * as fs from "fs";
import * as path from "path";
import { generateBlogArticle, generateMultipleArticles } from "./blogGenerator";
import { BLOG_CATEGORIES, normalizeCategory } from "./blogCategories";
import { recordImageUsage, getArticleImages } from "./imageUsageTracker";

type StoredArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  category: string;
  readTime: number;
  language: string;
  createdAt: string;
  updated?: string;
  published: boolean;
  featuredImage?: string;
  images?: Array<{ url: string; alt: string; source: string }>;
  author?: string;
  tags?: string[];
};

// Persist articles to a JSON file so they survive hot reloads and server restarts
const DATA_FILE = path.join(process.cwd(), ".blog-data.json");

function readArticles(): Map<string, StoredArticle> {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      const data = JSON.parse(raw) as Record<string, StoredArticle>;
      return new Map(Object.entries(data));
    }
  } catch (error) {
    console.error("[blogService] Failed to read data file:", error);
  }
  return new Map();
}

function writeArticles(articles: Map<string, StoredArticle>): void {
  try {
    const data = Object.fromEntries(articles);
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("[blogService] Failed to write data file:", error);
  }
}

export async function saveBlogArticle(
  article: Awaited<ReturnType<typeof generateBlogArticle>>,
  category?: string,
  tags?: string[],
) {
  const id = `${article.slug}-${Date.now()}`;
  const saved: StoredArticle = {
    id,
    ...article,
    category: normalizeCategory(category || article.category),
    createdAt: new Date().toISOString(),
    published: false,
    author: "Paitonix",
    tags: tags || [],
  };

  const articles = readArticles();
  articles.set(id, saved);
  writeArticles(articles);

  // Record image usage if featured image exists
  if (saved.featuredImage) {
    recordImageUsage(
      saved.featuredImage,
      article.title,
      article.slug,
      "unsplash",
    );
  }

  return saved;
}

export async function generateAndSaveBlogArticles(
  topics: string[],
  language: "id" | "en" = "en",
  category?: string,
  tags?: string[],
) {
  const articles = await generateMultipleArticles(topics, {
    language,
    style: "business",
    includeImages: true,
  });

  const saved = [];
  for (const article of articles) {
    const result = await saveBlogArticle(article, category, tags);
    saved.push(result);
  }

  return saved;
}

export function getAllArticles(
  language?: "id" | "en",
  category?: string,
  published?: boolean,
) {
  let articles = Array.from(readArticles().values());
  const normalizedCategory = category ? normalizeCategory(category) : undefined;

  if (language) {
    articles = articles.filter((a) => a.language === language);
  }

  if (normalizedCategory) {
    articles = articles.filter(
      (a) => normalizeCategory(a.category) === normalizedCategory,
    );
  }

  if (published !== undefined) {
    articles = articles.filter((a) => a.published === published);
  }

  return articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getArticleBySlug(slug: string) {
  const articles = Array.from(readArticles().values());
  return articles.find((a) => a.slug === slug);
}

export function getArticlesByCategory(category: string, published = true) {
  return getAllArticles(undefined, category, published);
}

export function publishArticle(id: string) {
  const articles = readArticles();
  const article = articles.get(id);
  if (!article) throw new Error("Article not found");

  article.published = true;
  article.updated = new Date().toISOString();
  articles.set(id, article);
  writeArticles(articles);
  return article;
}

export function unpublishArticle(id: string) {
  const articles = readArticles();
  const article = articles.get(id);
  if (!article) throw new Error("Article not found");

  article.published = false;
  article.updated = new Date().toISOString();
  articles.set(id, article);
  writeArticles(articles);
  return article;
}

export function updateArticle(id: string, updates: Partial<StoredArticle>) {
  const articles = readArticles();
  const article = articles.get(id);
  if (!article) throw new Error("Article not found");

  const updated = {
    ...article,
    ...updates,
    updated: new Date().toISOString(),
  };

  articles.set(id, updated);
  writeArticles(articles);
  return updated;
}

export function deleteArticle(id: string) {
  const articles = readArticles();
  const article = articles.get(id);
  if (!article) throw new Error("Article not found");

  articles.delete(id);
  writeArticles(articles);
  return article;
}

export function getArticleStats() {
  const articles = Array.from(readArticles().values());
  const published = articles.filter((a) => a.published).length;
  const draft = articles.filter((a) => !a.published).length;

  const byCategory: Record<string, number> = {};
  const byLanguage: Record<string, number> = {};

  for (const article of articles) {
    byCategory[article.category] = (byCategory[article.category] || 0) + 1;
    byLanguage[article.language] = (byLanguage[article.language] || 0) + 1;
  }

  return {
    total: articles.length,
    published,
    draft,
    byCategory,
    byLanguage,
  };
}

export { BLOG_CATEGORIES };
