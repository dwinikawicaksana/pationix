# Publishing Blog Articles with Images

Your blog generation system now supports multiple image sourcing methods. Here's how to use them:

## Quick Start

### Option 1: Auto-Generate with Unsplash Images (Easiest)

1. Go to `/admin/blog` dashboard
2. Check the **"Include Images"** checkbox
3. Enter a topic and click "Generate"
4. Images will automatically be fetched from Unsplash and embedded

### Option 2: Manual Image Upload

Upload images after article generation using the image upload API.

---

## Setup Guide

### 1. **Unsplash Images (Free, No API Key Required)**

**Current Setup**: Already configured! Images are free via Unsplash's search API.

**Upgrade to Higher Rate Limits** (optional):

```bash
# Get free API key at: https://unsplash.com/oauth/applications
# Set in .env.local:
UNSPLASH_ACCESS_KEY=your_key_here
```

**Rate Limits**:

- Without key: 50 requests/hour
- With key: 200 requests/hour

---

### 2. **Local File Uploads**

Already set up! Upload endpoint: `POST /api/upload`

**Usage in Frontend**:

```typescript
const formData = new FormData();
formData.append("file", imageFile);
formData.append("articleSlug", "article-slug");

const response = await fetch("/api/upload", {
  method: "POST",
  body: formData,
});

const { url } = await response.json();
// Use url in article content
```

**Upload Directory**: `/public/uploads/articles/`

---

### 3. **Cloud Storage Solutions** (Recommended for Production)

#### Option A: Vercel Blob (Easiest for Vercel)

```bash
npm install @vercel/blob
```

Update `lib/imageService.ts`:

```typescript
import { put } from "@vercel/blob";

export async function uploadImageToBlob(file: File): Promise<string> {
  const blob = await put(file.name, file, {
    access: "public",
  });
  return blob.url;
}
```

#### Option B: Cloudinary (Most Features)

```bash
npm install next-cloudinary
```

Create `.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

#### Option C: AWS S3

```bash
npm install @aws-sdk/client-s3
```

Update `lib/imageService.ts` with S3 upload logic.

---

## How Image Generation Works

### Automatic Image Selection

When you check "Include Images":

1. **AI Analyzes Article**: Extracts key topics from title & content
2. **Generates Search Queries**: Creates 3 image search queries
3. **Fetches from Unsplash**: Gets 1 relevant image per query
4. **Embeds in Content**:
   - Featured image at top
   - Additional images between sections

**Example Flow**:

- Article: "React Performance Optimization"
- Queries: "React optimization", "JavaScript performance", "Web optimization"
- Result: 3 professional images auto-embedded

### Image Embedding in Markdown

```markdown
![Featured image alt text](https://unsplash.com/image1.jpg)

# React Performance Optimization

Content here...

![Performance measurement image](https://unsplash.com/image2.jpg)

## Key Strategies

More content...

![Optimization techniques image](https://unsplash.com/image3.jpg)
```

---

## Publishing to Different Platforms

### Option 1: Display on Your Website

The system stores article data with images. Create a display page:

```typescript
// app/blog/[slug]/page.tsx
import { getArticleBySlug } from "@/lib/blogService";
import { markdownImagesToHtml } from "@/lib/imageService";

export default function BlogPost({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  const htmlContent = markdownImagesToHtml(article.content);

  return (
    <div className="blog-post">
      {article.featuredImage && (
        <img src={article.featuredImage} alt={article.title} className="w-full" />
      )}
      <h1>{article.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
}
```

### Option 2: Publish to Blogger

Update `lib/blogGenerator.ts`:

```typescript
export async function publishToBlogger(article: GeneratedArticle) {
  const htmlContent = markdownImagesToHtml(article.content);

  const response = await fetch(
    `https://www.googleapis.com/blogger/v3/blogs/{blogId}/posts?key=${process.env.GOOGLE_API_KEY}`,
    {
      method: "POST",
      body: JSON.stringify({
        title: article.title,
        content: htmlContent,
        labels: article.keywords,
      }),
    },
  );

  return response.json();
}
```

### Option 3: Publish to Medium

```typescript
export async function publishToMedium(article: GeneratedArticle) {
  const response = await fetch("https://api.medium.com/v1/users/me/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MEDIUM_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: article.title,
      content: article.content,
      contentFormat: "markdown",
      publishStatus: "draft",
    }),
  });

  return response.json();
}
```

### Option 4: Save to Database + Display

```typescript
// lib/blogService.ts
export async function saveBlogArticleWithImages(article: GeneratedArticle) {
  const saved = await db.blogArticle.create({
    data: {
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      content: article.content,
      featuredImage: article.featuredImage,
      images: article.images,
      keywords: article.keywords,
      category: article.category,
      readTime: article.readTime,
      language: article.language,
      published: false,
    },
  });

  return saved;
}
```

---

## Admin Dashboard Features

### Single Article Generation

- Topic input
- Style selection (Technical/Business/Casual)
- **Include Images** checkbox
- Auto-preview in recent articles list

### Bulk Generation

- Multiple topics (one per line)
- Same options as single generation
- Generates 2-3 images per article

### Article Display

- Featured image thumbnail (24x24)
- Article title and excerpt
- Read time indicator
- Draft/Published status

---

## Advanced: Custom Image Prompts

Modify `lib/imageService.ts` to customize image search:

```typescript
export function generateImagePrompts(
  title: string,
  content: string,
  language: "id" | "en" = "en",
): string[] {
  const customPrompts: { [key: string]: string[] } = {
    "web development": ["web design", "coding", "digital product"],
    react: ["react js", "javascript framework", "frontend"],
    // Add more keyword-specific prompts
  };

  // Use custom prompts if keyword found, else auto-generate
  for (const [keyword, prompts] of Object.entries(customPrompts)) {
    if (title.toLowerCase().includes(keyword)) {
      return prompts;
    }
  }

  // Fallback to auto-generation
  return extractKeywords(title, content);
}
```

---

## Troubleshooting

### Images Not Loading

```
Check: UNSPLASH_ACCESS_KEY in .env.local (optional but recommended)
Fix: Verify Unsplash API availability
```

### Rate Limit Errors

```
Issue: More than 50 images/hour without API key
Fix: Set UNSPLASH_ACCESS_KEY or reduce bulk generation size
```

### Images Not Embedded in Content

```
Check: includeImages checkbox is checked
Check: Browser console for error messages
Fix: Retry generation, check image fetch errors in server logs
```

### Upload Failures

```
Check: File size < 5MB
Check: File type is JPG/PNG/WebP/GIF
Check: /public/uploads/articles/ directory exists
```

---

## Next Steps

1. ✅ Generate articles with images using admin dashboard
2. 📝 Create blog display pages using your articles
3. 📤 Publish to external platforms (Medium, Blogger, etc.)
4. 💾 Connect to database for permanent storage
5. 🔄 Set up scheduled/cron job generation

---

## Environment Variables Reference

```env
# Unsplash (optional - for higher rate limits)
UNSPLASH_ACCESS_KEY=your_key_here

# For Vercel Blob uploads (optional)
BLOB_READ_WRITE_TOKEN=your_token_here

# For Cloudinary uploads (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret

# For Medium publishing (optional)
MEDIUM_TOKEN=your_token_here

# For Blogger publishing (optional)
GOOGLE_API_KEY=your_key_here
```
