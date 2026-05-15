import { NextRequest, NextResponse } from "next/server";
import { generateMultipleArticles } from "@/lib/blogGenerator";
import { saveBlogArticle, publishArticle } from "@/lib/blogService";

// Allow long-running generation on Vercel.
export const maxDuration = 300;
export const dynamic = "force-dynamic";

/**
 * Topic pool — rotated so each run picks 3 fresh prompts across categories.
 * Pairs of (topic, category) keep image search and tags relevant.
 */
const TOPIC_POOL: Array<{ topic: string; category: string }> = [
  {
    topic: "AI automation for small businesses in 2025",
    category: "AI & Automation",
  },
  { topic: "Mobile-first UI design principles", category: "UI/UX" },
  { topic: "Scaling SaaS products globally", category: "SaaS" },
  { topic: "Modern e-commerce conversion strategies", category: "E-Commerce" },
  { topic: "Brand identity systems for startups", category: "Branding" },
  {
    topic: "Data analytics dashboards that drive decisions",
    category: "Data & Analytics",
  },
  { topic: "Cybersecurity essentials for web apps", category: "Cybersecurity" },
  { topic: "Product strategy frameworks", category: "Product Strategy" },
  { topic: "React server components best practices", category: "Development" },
  { topic: "Marketing automation playbook", category: "Marketing" },
  { topic: "Operations workflows for remote teams", category: "Operations" },
  { topic: "Cross-platform mobile app architecture", category: "Mobile Apps" },
];

function pickRotating(count: number) {
  // Use the day-of-year so each cron tick gets a different slice.
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000,
  );
  const start = (dayOfYear * 3) % TOPIC_POOL.length;
  const result: typeof TOPIC_POOL = [];
  for (let i = 0; i < count; i++) {
    result.push(TOPIC_POOL[(start + i) % TOPIC_POOL.length]);
  }
  return result;
}

async function runCron() {
  // Group selections by category so we generate per-category in one call.
  const picks = pickRotating(3);
  const results: Array<{ slug: string; title: string; category: string }> = [];

  for (const { topic, category } of picks) {
    try {
      const articles = await generateMultipleArticles([topic], {
        language: "en",
        style: "business",
        includeImages: true,
        useAIImages: true,
        category,
      });

      for (const article of articles) {
        const saved = await saveBlogArticle(article, category, article.tags);
        if (saved?.id) {
          publishArticle(saved.id);
          results.push({
            slug: saved.slug,
            title: saved.title,
            category: saved.category,
          });
        }
      }
    } catch (err) {
      console.error("[cron/blog] failed to generate", topic, err);
    }
  }

  return results;
}

function isAuthorized(request: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    // If no secret is configured, allow only Vercel cron's UA in production.
    return true;
  }
  const auth = request.headers.get("authorization") || "";
  return auth === `Bearer ${secret}`;
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await runCron();
  return NextResponse.json({
    ok: true,
    generated: results.length,
    articles: results,
    ranAt: new Date().toISOString(),
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
