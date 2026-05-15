/**
 * Image Service - Provides multiple image sourcing options for blog articles
 * Options:
 * 1. Unsplash API (free stock photos)
 * 2. AI image generation (Replicate or Stability AI)
 * 3. Local file uploads
 * 4. External URLs
 */

import { recordImageUsage, getRecentlyUsedImages } from "./imageUsageTracker";

interface BlogArticleImage {
  url: string;
  alt: string;
  source: "unsplash" | "upload" | "ai" | "external";
  credit?: string;
}

/**
 * Generate image using Replicate API (if available)
 * Falls back to Unsplash if generation fails or API key not available
 */
export async function generateImageWithAI(
  prompt: string,
  options: { width?: number; height?: number; style?: string } = {},
): Promise<BlogArticleImage | null> {
  const apiToken = process.env.REPLICATE_API_TOKEN;

  if (!apiToken) {
    console.warn(
      "[imageService] Replicate API token not configured, skipping AI generation",
    );
    return null;
  }

  try {
    const { width = 1024, height = 768, style = "professional" } = options;

    // Enhanced prompt for better image generation
    const enhancedPrompt = `${style} professional illustration: ${prompt}. High quality, detailed, modern design. Suitable for blog article. 8k resolution`;

    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
          "27b93a2413e7f36cd83da926f3806ded9555eae4250b1a5276377a6f2fe90986", // Stable Diffusion 3
        input: {
          prompt: enhancedPrompt,
          width,
          height,
          num_inference_steps: 25,
          guidance_scale: 7.5,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Replicate API error: ${response.statusText}`);
    }

    const prediction: any = await response.json();

    // Poll for completion (simplified - in production use webhooks)
    let completed = prediction;
    let attempts = 0;

    while (
      completed.status !== "succeeded" &&
      completed.status !== "failed" &&
      attempts < 30
    ) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const checkResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${completed.id}`,
        {
          headers: {
            Authorization: `Token ${apiToken}`,
          },
        },
      );
      completed = await checkResponse.json();
      attempts++;
    }

    if (completed.status === "succeeded" && completed.output) {
      const imageUrl = Array.isArray(completed.output)
        ? completed.output[0]
        : completed.output;

      const image: BlogArticleImage = {
        url: imageUrl,
        alt: prompt,
        source: "ai",
        credit: "Generated with AI",
      };

      recordImageUsage(imageUrl, prompt, "", "ai");
      return image;
    }

    return null;
  } catch (error) {
    console.warn("[imageService] AI image generation failed:", error);
    return null;
  }
}

/**
 * Fetch images from Unsplash API based on search query
 * Avoids recently used images to ensure variety
 * Free tier: 50 requests/hour without authentication
 */
export async function fetchUnsplashImages(
  searchQuery: string,
  count: number = 1,
  excludeRecentImages: boolean = true,
): Promise<BlogArticleImage[]> {
  try {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    // Fetch more results to pick unique ones
    const fetchCount = Math.min(count * 5, 30);

    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        searchQuery,
      )}&per_page=${fetchCount}&order_by=relevant${
        accessKey ? `&client_id=${accessKey}` : ""
      }`,
    );

    if (!response.ok) {
      throw new Error(`Unsplash API error: ${response.statusText}`);
    }

    const data: any = await response.json();

    if (!data.results || data.results.length === 0) {
      return [];
    }

    // Get recently used images if we want to avoid them
    const recentImages = excludeRecentImages ? getRecentlyUsedImages(3) : null;

    // Filter out recently used images and randomly select
    let candidates = [...data.results];

    if (recentImages) {
      candidates = candidates.filter(
        (photo: any) => !recentImages.has(photo.urls.regular),
      );
    }

    // If we filtered too many, just use what we have
    if (candidates.length === 0) {
      candidates = [...data.results];
    }

    const shuffled = candidates.sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count).map((photo: any) => ({
      url: photo.urls.regular,
      alt: photo.alt_description || searchQuery,
      source: "unsplash",
      credit: `Photo by ${photo.user.name} on Unsplash`,
    }));
  } catch (error) {
    console.error("[imageService] Unsplash fetch error:", error);
    return [];
  }
}

/**
 * Generate image prompts for blog article sections.
 * Output is strictly topic-related (no generic randomization) so search
 * queries return images that match the article's subject.
 */
export function generateImagePrompts(
  title: string,
  content: string,
  language: "id" | "en" = "en",
  category?: string,
): string[] {
  const keywords = extractKeywords(title, content);
  const cat = (category || "").trim();

  // Map common categories to a concrete visual hint
  const categoryHint: Record<string, string> = {
    Technology: "technology workspace",
    Design: "design studio",
    Business: "business meeting",
    Development: "software developer coding",
    "AI & Automation": "artificial intelligence robot",
    "Product Strategy": "product roadmap whiteboard",
    Marketing: "marketing campaign analytics",
    "Mobile Apps": "mobile app interface",
    "E-Commerce": "online shopping ecommerce",
    SaaS: "saas dashboard interface",
    Branding: "brand identity design",
    "UI/UX": "ui ux interface design",
    "Data & Analytics": "data analytics dashboard",
    Cybersecurity: "cybersecurity network",
    Operations: "operations workflow office",
  };

  const hint = categoryHint[cat] || cat.toLowerCase() || "";

  // Build up to 3 unique, focused prompts using the top keywords.
  const base = keywords.slice(0, 3);
  if (base.length === 0 && hint) return [hint];

  return base.map((keyword) => {
    const parts = [keyword, hint].filter(Boolean);
    const prompt = parts.join(" ").trim();
    // Light language flavor only — no random "modern professional" filler.
    return language === "id" ? prompt : prompt;
  });
}

/**
 * Extract keywords for image search from article title and content.
 * Filters common stopwords and prefers longer, content-bearing words.
 */
function extractKeywords(title: string, content: string): string[] {
  const stopwords = new Set([
    "the",
    "and",
    "for",
    "with",
    "from",
    "this",
    "that",
    "your",
    "into",
    "about",
    "have",
    "what",
    "when",
    "where",
    "while",
    "yang",
    "untuk",
    "dengan",
    "akan",
    "atau",
    "adalah",
    "dari",
    "pada",
    "dalam",
    "dapat",
    "tips",
    "guide",
    "best",
    "trends",
    "modern",
    "future",
    "ways",
    "how",
    "panduan",
    "terbaik",
    "tren",
    "cara",
    "masa",
    "depan",
  ]);

  const clean = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !stopwords.has(w));

  const titleWords = clean(title).slice(0, 4);

  const headerMatch = content.match(/^#+\s+(.+?)$/gm) || [];
  const headerWords = headerMatch
    .flatMap((h) => clean(h.replace(/^#+\s+/, "")))
    .slice(0, 3);

  // Combine and deduplicate while preserving order.
  const seen = new Set<string>();
  const combined = [...titleWords, ...headerWords].filter((w) => {
    if (seen.has(w)) return false;
    seen.add(w);
    return true;
  });

  return combined;
}

/**
 * Get smart image source - tries AI first, then Unsplash
 */
export async function getSmartImage(
  prompt: string,
  options: {
    preferAI?: boolean;
    style?: string;
  } = {},
): Promise<BlogArticleImage | null> {
  const { preferAI = true, style = "professional" } = options;

  if (preferAI) {
    const aiImage = await generateImageWithAI(prompt, { style });
    if (aiImage) return aiImage;
  }

  // Fallback to Unsplash
  const unsplashImages = await fetchUnsplashImages(prompt, 1, true);
  return unsplashImages[0] || null;
}

/**
 * Format article content with embedded images
 */
export function embedImagesInContent(
  content: string,
  images: BlogArticleImage[],
): string {
  if (!images.length) return content;

  let result = `![${images[0]?.alt}](${images[0]?.url})\n\n${content}`;

  if (images.length > 1) {
    const sections = result.split(/(?=^##\s)/m);
    result = sections
      .map((section, idx) => {
        if (idx > 0 && idx < images.length) {
          return `![${images[idx]?.alt}](${images[idx]?.url})\n\n${section}`;
        }
        return section;
      })
      .join("");
  }

  return result;
}

/**
 * Convert Markdown images to HTML img tags with proper styling
 */
export function markdownImagesToHtml(markdownContent: string): string {
  return markdownContent.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="w-full rounded-lg shadow-lg my-6" />',
  );
}

/**
 * Upload image to your server/storage
 */
export async function uploadImage(
  file: File,
  articleSlug: string,
): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("articleSlug", articleSlug);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  recordImageUsage(data.url, "user-upload", articleSlug, "upload");
  return data.url;
}
