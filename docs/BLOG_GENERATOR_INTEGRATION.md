# Blog Generator Integration Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                    Your Application                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Frontend Components:                                           │
│  ├─ BlogGenerator.tsx (UI for users)                           │
│  ├─ AdminBlogPage.tsx (Admin dashboard)                        │
│  └─ Your pages (embed blog display)                            │
│                                                                 │
│                         ↓ (API Call)                           │
│                                                                 │
│  Backend API:                                                   │
│  ├─ /api/blog/generate (POST endpoint)                         │
│                                                                 │
│                         ↓                                       │
│                                                                 │
│  Blog Service & Generator:                                      │
│  ├─ lib/blogGenerator.ts (AI generation)                       │
│  ├─ lib/blogService.ts (storage & management)                  │
│  └─ @google/generative-ai (Gemini API)                         │
│                                                                 │
│                         ↓ (Save)                               │
│                                                                 │
│  Database/Storage:                                              │
│  ├─ Prisma ORM (recommended)                                   │
│  ├─ MongoDB                                                     │
│  └─ PostgreSQL                                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5 Integration Methods

### Method 1: Basic Frontend Component

**Use Case:** Simple blog generation form on your landing page

```tsx
// app/page.tsx
import BlogGenerator from "@/components/BlogGenerator";

export default function Home() {
  return (
    <>
      <Hero />
      <BlogGenerator />
      <Footer />
    </>
  );
}
```

---

### Method 2: Admin Dashboard

**Use Case:** Content team manages articles

```bash
# Access at: http://localhost:3000/admin/blog
```

Features:

- Single article generation
- Bulk generation (paste multiple topics)
- Article statistics
- Draft/Publish management

---

### Method 3: Server-Side Function (No UI)

**Use Case:** Automated article generation

```tsx
// pages/api/admin/generate-weekly.ts
import { generateAndSaveBlogArticles } from "@/lib/blogService";

export async function POST(req: NextRequest) {
  try {
    const articles = await generateAndSaveBlogArticles(
      ["Web Development Trends 2026", "AI in Business", "Future of Super Apps"],
      "en",
    );

    // Store in database here
    // await db.articles.createMany(articles);

    return NextResponse.json({
      success: true,
      count: articles.length,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
```

---

### Method 4: Scheduled Generation (Cron Jobs)

**Use Case:** Automatic posts every week

```tsx
// lib/cron.ts
import { generateAndSaveBlogArticles } from "@/lib/blogService";

export async function generateWeeklyBlog() {
  const topics = ["Latest Tech News", "Industry Insights", "Product Updates"];

  const articles = await generateAndSaveBlogArticles(topics, "en");

  // Publish automatically or create drafts
  for (const article of articles) {
    // await publishToDatabase(article);
  }

  return articles;
}
```

Set up with a cron service like:

- **Vercel Cron**: `vercel.json`
- **EasyCron**: External scheduler
- **Node Cron**: `node-cron` package

---

### Method 5: One-Click Generation (Admin Button)

**Use Case:** Team members click a button to generate

```tsx
// components/AdminGenerateButton.tsx
"use client";

export default function AdminGenerateButton() {
  const handleQuickGenerate = async () => {
    const response = await fetch("/api/blog/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "generate-multiple",
        topics: ["Web Dev Trends", "AI News", "Startup Tips"],
        language: "en",
      }),
    });

    const result = await response.json();
    alert(`Generated ${result.count} articles!`);
  };

  return (
    <button onClick={handleQuickGenerate}>⚡ Generate Weekly Content</button>
  );
}
```

---

## Database Setup (Prisma Example)

### 1. Define Schema

```prisma
// prisma/schema.prisma
model BlogArticle {
  id        String   @id @default(cuid())
  title     String
  slug      String   @unique
  excerpt   String
  content   String   @db.Text
  keywords  String[] // JSON array
  category  String
  readTime  Int
  language  String   @default("en")
  published Boolean  @default(false)
  author    String   @default("OniX AI")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([published, language])
}
```

### 2. Generate Prisma Client

```bash
npx prisma generate
npx prisma migrate dev --name add_blog_articles
```

### 3. Update Blog Service

```tsx
// lib/blogService.ts (with Prisma)
import { prisma } from "@/lib/prisma";

export async function saveBlogArticle(article: GeneratedArticle) {
  return await prisma.blogArticle.create({
    data: {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      keywords: article.keywords,
      category: article.category,
      readTime: article.readTime,
      language: article.language,
    },
  });
}

export async function getAllArticles(language?: string) {
  return await prisma.blogArticle.findMany({
    where: language ? { language } : {},
    orderBy: { createdAt: "desc" },
  });
}
```

---

## Connect to Your Pages

### Display Generated Articles

```tsx
// app/blog/page.tsx
import { getAllArticles } from "@/lib/blogService";

export default async function BlogPage() {
  const articles = await getAllArticles();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto">
        <h1>Blog Posts</h1>
        {articles.map((article) => (
          <article key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.excerpt}</p>
            <a href={`/blog/${article.slug}`}>Read More</a>
          </article>
        ))}
      </div>
    </section>
  );
}
```

---

## Quick Start Checklist

- [ ] Generate test article via API
- [ ] Store in database (or JSON file for testing)
- [ ] Display on homepage with BlogGenerator component
- [ ] Access admin panel at `/admin/blog`
- [ ] Test bulk generation
- [ ] Set up Prisma schema (optional)
- [ ] Configure environment variables
- [ ] Deploy to production

---

## API Response Examples

### Single Article Response

```json
{
  "title": "Web Development Trends 2026",
  "slug": "web-development-trends-2026",
  "excerpt": "Discover the latest trends shaping web development...",
  "content": "# Web Development Trends\n\n## 1. AI Integration\n...",
  "keywords": ["web development", "AI", "trends"],
  "category": "Technology",
  "readTime": 5,
  "language": "en"
}
```

### Bulk Generation Response

```json
{
  "count": 3,
  "articles": [
    { ...article1 },
    { ...article2 },
    { ...article3 }
  ]
}
```

---

## Troubleshooting

| Issue           | Solution                                         |
| --------------- | ------------------------------------------------ |
| API returns 400 | Check topics array format, ensure valid language |
| Rate limiting   | Add 2-3 second delays between requests           |
| Content quality | Adjust system prompt in blogGenerator.ts         |
| Database errors | Verify Prisma schema matches code                |
| CORS issues     | Check API endpoint CORS configuration            |

---

## Next Steps

1. **Test the API:** `curl -X POST http://localhost:3000/api/blog/generate`
2. **Run Admin:** Go to `/admin/blog` and generate 3-5 test articles
3. **Connect Database:** Set up Prisma and save articles
4. **Deploy Blog Page:** Create `/blog` route to display articles
5. **Schedule Crons:** Set up automatic weekly generation
6. **Monitor:** Track article views and engagement
