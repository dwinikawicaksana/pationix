import * as fs from "fs";
import * as path from "path";
import { generateBlogArticle, generateMultipleArticles } from "./blogGenerator";

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
  published: boolean;
  featuredImage?: string;
  images?: Array<{ url: string; alt: string; source: string }>;
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
) {
  const id = `${article.slug}-${Date.now()}`;
  const saved: StoredArticle = {
    id,
    ...article,
    createdAt: new Date().toISOString(),
    published: false,
  };

  const articles = readArticles();
  articles.set(id, saved);
  writeArticles(articles);
  return saved;
}

export async function generateAndSaveBlogArticles(
  topics: string[],
  language: "id" | "en" = "en",
) {
  const articles = await generateMultipleArticles(topics, {
    language,
    style: "business",
  });

  const saved = [];
  for (const article of articles) {
    const result = await saveBlogArticle(article);
    saved.push(result);
  }

  return saved;
}

export function getAllArticles(language?: "id" | "en") {
  const articles = Array.from(readArticles().values());
  return language ? articles.filter((a) => a.language === language) : articles;
}

export function getArticleBySlug(slug: string) {
  const articles = Array.from(readArticles().values());
  return articles.find((a) => a.slug === slug);
}

export function publishArticle(id: string) {
  const articles = readArticles();
  const article = articles.get(id);
  if (!article) throw new Error("Article not found");

  article.published = true;
  articles.set(id, article);
  writeArticles(articles);
  return article;
}
