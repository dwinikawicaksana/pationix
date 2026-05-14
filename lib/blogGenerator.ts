import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fetchUnsplashImages,
  embedImagesInContent,
  generateImagePrompts,
} from "./imageService";

interface BlogArticleConfig {
  topic: string;
  language: "id" | "en";
  style?: "technical" | "business" | "casual";
  includeImages?: boolean;
}

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  category: string;
  readTime: number;
  language: string;
  featuredImage?: string;
  images?: Array<{ url: string; alt: string; source: string }>;
}

/**
 * Retry a function with exponential backoff
 * Useful for handling transient API failures (503, rate limits, etc.)
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelayMs: number = 1000,
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      const errorMessage = lastError.message || String(error);

      // Check if it's a transient error worth retrying
      const isTransient =
        errorMessage.includes("503") ||
        errorMessage.includes("429") ||
        errorMessage.includes("Service Unavailable") ||
        errorMessage.includes("Too Many Requests");

      if (!isTransient || attempt === maxRetries - 1) {
        throw error;
      }

      // Exponential backoff: 1s, 2s, 4s
      const delayMs = initialDelayMs * Math.pow(2, attempt);
      console.warn(
        `[Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delayMs}ms...`,
        errorMessage,
      );
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw lastError || new Error("Failed after retries");
}

export async function generateBlogArticle(
  config: BlogArticleConfig,
): Promise<GeneratedArticle> {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("API key not found in environment variables");
    throw new Error("API key not configured. Please set GOOGLE_API_KEY");
  }

  return retryWithBackoff(
    async () => {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const systemPrompt =
        config.language === "id"
          ? `Anda adalah penulis blog profesional untuk Paitonix Labs. Tulis artikel blog berkualitas tinggi, SEO-friendly, dan menarik dalam format JSON yang valid.`
          : `You are a professional blog writer for Paitonix Labs. Write high-quality, SEO-friendly, and engaging blog articles in valid JSON format.`;

      const userPrompt =
        config.language === "id"
          ? `Buatkan artikel blog tentang: "${config.topic}"
         
Respond ONLY with valid JSON, no other text:
{
  "title": "Judul artikel dalam bahasa Indonesia",
  "slug": "judul-artikel",
  "excerpt": "Ringkasan singkat artikel (50-100 kata) dalam bahasa Indonesia",
  "content": "# Judul\n\nIsi artikel lengkap dengan markdown formatting (800-1000 kata) dalam bahasa Indonesia",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "category": "Teknologi",
  "readTime": 8
}`
          : `Create a blog article about: "${config.topic}"

Respond ONLY with valid JSON, no other text:
{
  "title": "Article Title in English",
  "slug": "article-title",
  "excerpt": "Brief summary of the article (50-100 words) in English",
  "content": "# Title\n\nFull article content with markdown formatting (800-1000 words) in English",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "category": "Technology",
  "readTime": 8
}`;

      console.log("Generating blog article:", config.topic);
      const response = await model.generateContent({
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt }],
          },
        ],
        systemInstruction: {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
      });

      const text = response.response.text();
      console.log("Raw response:", text.substring(0, 200));

      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("Could not extract JSON from response:", text);
        throw new Error("Invalid response format from AI");
      }

      const article = JSON.parse(jsonMatch[0]) as GeneratedArticle;
      article.language = config.language;

      // Fetch images if requested
      if (config.includeImages) {
        console.log("Fetching images for article...");
        try {
          // Generate image search prompts
          const imagePrompts = generateImagePrompts(
            article.title,
            article.content,
            config.language,
          );

          // Fetch images for each prompt
          const allImages = [];
          for (const prompt of imagePrompts) {
            const images = await fetchUnsplashImages(prompt, 1);
            allImages.push(...images);
          }

          if (allImages.length > 0) {
            article.featuredImage = allImages[0]?.url;
            article.images = allImages;

            // Embed featured image in content
            article.content = embedImagesInContent(article.content, allImages);
            console.log(`Added ${allImages.length} images to article`);
          }
        } catch (imageError) {
          console.warn(
            "Failed to fetch images, continuing without images:",
            imageError,
          );
          // Continue without images - don't fail the entire generation
        }
      }

      console.log("Article generated successfully:", article.title);
      return article;
    },
    3, // maxRetries
    1000, // initialDelayMs
  );
}

export async function generateMultipleArticles(
  topics: string[],
  config: Omit<BlogArticleConfig, "topic">,
): Promise<GeneratedArticle[]> {
  const articles: GeneratedArticle[] = [];

  for (const topic of topics) {
    try {
      const article = await generateBlogArticle({ ...config, topic });
      articles.push(article);
      // Add delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error(`Failed to generate article for topic "${topic}":`, error);
    }
  }

  return articles;
}

export function generateBloggerPostHTML(article: GeneratedArticle): string {
  return `<!DOCTYPE html>
<html>
<head>
  <title>${article.title}</title>
  <meta name="description" content="${article.excerpt}">
  <meta name="keywords" content="${article.keywords.join(", ")}">
  <meta property="og:title" content="${article.title}">
  <meta property="og:description" content="${article.excerpt}">
</head>
<body>
  <article>
    <h1>${article.title}</h1>
    <div class="meta">
      <span class="read-time">${article.readTime} min read</span>
      <span class="category">${article.category}</span>
      <span class="language">${article.language === "id" ? "Bahasa Indonesia" : "English"}</span>
    </div>
    <div class="content">
      ${markdownToHtml(article.content)}
    </div>
  </article>
</body>
</html>`;
}

function markdownToHtml(markdown: string): string {
  let html = markdown
    // Headers
    .replace(/^### (.*?)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*?)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*?)$/gm, "<h1>$1</h1>")
    // Bold
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    // Italic
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    // Line breaks
    .replace(/\n\n/g, "</p><p>")
    // Bullet points
    .replace(/^\* (.*?)$/gm, "<li>$1</li>");

  // Wrap in paragraphs
  html = `<p>${html}</p>`;

  return html;
}
