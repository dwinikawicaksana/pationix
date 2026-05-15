import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  fetchUnsplashImages,
  embedImagesInContent,
  generateImagePrompts,
  getSmartImage,
} from "./imageService";
import { BLOG_CATEGORIES, normalizeCategory } from "./blogCategories";

interface BlogArticleConfig {
  topic: string;
  language: "id" | "en";
  style?: "technical" | "business" | "casual";
  includeImages?: boolean;
  useAIImages?: boolean;
  category?: string;
}

interface GeneratedArticle {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  keywords: string[];
  tags: string[];
  category: string;
  readTime: number;
  language: string;
  featuredImage?: string;
  images?: Array<{ url: string; alt: string; source: string }>;
}

/**
 * Retry a function with exponential backoff
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

      const isTransient =
        errorMessage.includes("503") ||
        errorMessage.includes("429") ||
        errorMessage.includes("Service Unavailable") ||
        errorMessage.includes("Too Many Requests");

      if (!isTransient || attempt === maxRetries - 1) {
        throw error;
      }

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
          ? `Anda adalah penulis blog profesional untuk Paitonix Labs. Tulis artikel blog berkualitas tinggi, SEO-friendly, dan menarik dalam format JSON yang valid. Sertakan kata kunci SEO dan 6-10 hashtag relevan (mulai dengan #, tanpa spasi, contoh: #DesainWeb) di field "tags" untuk meningkatkan jangkauan media sosial dan SEO.`
          : `You are a professional blog writer for Paitonix Labs. Write high-quality, SEO-friendly, and engaging blog articles in valid JSON format. Include SEO keywords and 6-10 relevant social-media hashtags (starting with #, no spaces, e.g. #WebDesign) in the "tags" field to improve SEO and social reach.`;

      const categoryList = BLOG_CATEGORIES.map(
        (category) => category.label[config.language],
      ).join(", ");
      const requestedCategory = config.category
        ? normalizeCategory(config.category)
        : undefined;

      const userPrompt =
        config.language === "id"
          ? `Buatkan artikel blog tentang: "${config.topic}"
Kategori yang harus dipakai: "${requestedCategory ? requestedCategory : "pilih yang paling relevan dari daftar kategori berikut"}"
Daftar kategori yang valid: ${categoryList}
         
Respond ONLY with valid JSON, no other text:
{
  "title": "Judul artikel dalam bahasa Indonesia",
  "slug": "judul-artikel",
  "excerpt": "Ringkasan singkat artikel (50-100 kata) dalam bahasa Indonesia",
  "content": "# Judul\n\nIsi artikel lengkap dengan markdown formatting (800-1000 kata) dalam bahasa Indonesia",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
  "category": "${requestedCategory || "Teknologi"}",
  "readTime": 8
}`
          : `Create a blog article about: "${config.topic}"

Use this category: "${requestedCategory ? requestedCategory : "choose the most relevant valid category from the list below"}"
Valid categories: ${categoryList}

Respond ONLY with valid JSON, no other text:
{
  "title": "Article Title in English",
  "slug": "article-title",
  "excerpt": "Brief summary of the article (50-100 words) in English",
  "content": "# Title\n\nFull article content with markdown formatting (800-1000 words) in English",
  "keywords": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
  "tags": ["#hashtag1", "#hashtag2", "#hashtag3", "#hashtag4", "#hashtag5", "#hashtag6", "#hashtag7", "#hashtag8"],
  "category": "${requestedCategory || "Technology"}",
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
      article.category = normalizeCategory(config.category || article.category);

      // Ensure tags exist; derive from keywords if model omitted them.
      if (!Array.isArray(article.tags) || article.tags.length === 0) {
        article.tags = (article.keywords || [])
          .slice(0, 8)
          .map(
            (k) =>
              "#" +
              String(k)
                .replace(/[^a-zA-Z0-9]+/g, "")
                .replace(/^./, (c) => c.toUpperCase()),
          )
          .filter((t) => t.length > 1);
      } else {
        // Normalize: ensure each tag begins with '#' and has no spaces.
        article.tags = article.tags
          .map((t) => {
            const cleaned = String(t).trim().replace(/\s+/g, "");
            return cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
          })
          .filter((t) => t.length > 1);
      }

      // Fetch images if requested
      if (config.includeImages) {
        console.log("Fetching images for article...");
        try {
          const imagePrompts = generateImagePrompts(
            article.title,
            article.content,
            config.language,
            article.category,
          );

          const allImages = [];

          // Try AI images first if enabled, then fallback to Unsplash
          if (config.useAIImages) {
            console.log("Generating images with AI...");
            for (const prompt of imagePrompts) {
              try {
                const aiImage = await getSmartImage(prompt, {
                  preferAI: true,
                  style: config.style || "professional",
                });
                if (aiImage) {
                  allImages.push(aiImage);
                }
              } catch (error) {
                console.warn(
                  "AI image generation failed, trying Unsplash:",
                  error,
                );
                const unsplashImages = await fetchUnsplashImages(
                  prompt,
                  1,
                  true,
                );
                allImages.push(...unsplashImages);
              }
            }
          } else {
            // Use only Unsplash
            for (const prompt of imagePrompts) {
              const images = await fetchUnsplashImages(prompt, 1, true);
              allImages.push(...images);
            }
          }

          if (allImages.length > 0) {
            article.featuredImage = allImages[0]?.url;
            article.images = allImages;

            article.content = embedImagesInContent(article.content, allImages);
            console.log(`Added ${allImages.length} images to article`);
          }
        } catch (imageError) {
          console.warn(
            "Failed to fetch images, continuing without images:",
            imageError,
          );
        }
      }

      console.log("Article generated successfully:", article.title);
      return article;
    },
    3,
    1000,
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
