/**
 * Image Service - Provides multiple image sourcing options for blog articles
 * Options:
 * 1. Unsplash API (free stock photos)
 * 2. Local file uploads
 * 3. AI image generation (future)
 */

interface BlogArticleImage {
  url: string;
  alt: string;
  source: "unsplash" | "upload" | "ai" | "external";
  credit?: string;
}

/**
 * Fetch images from Unsplash API based on search query
 * Free tier: 50 requests/hour without authentication
 * For production, get an Unsplash API key at unsplash.com/oauth/applications
 * Fetches multiple images and randomly selects to avoid duplicates
 */
export async function fetchUnsplashImages(
  searchQuery: string,
  count: number = 1,
): Promise<BlogArticleImage[]> {
  try {
    // If you have an Unsplash API key, use it for higher rate limits
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;

    // Fetch more results to randomly pick from, increasing variation
    const fetchCount = Math.min(count * 3, 30);

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

    // Randomly select images from results to avoid duplicates
    const shuffled = [...data.results].sort(() => Math.random() - 0.5);

    return shuffled.slice(0, count).map((photo: any) => ({
      url: photo.urls.regular,
      alt: photo.alt_description || searchQuery,
      source: "unsplash",
      credit: `Photo by ${photo.user.name} on Unsplash`,
    }));
  } catch (error) {
    console.error("Unsplash fetch error:", error);
    return [];
  }
}

/**
 * Generate image prompts for blog article sections
 * Used with AI image generation or stock photo search
 * Adds randomization to ensure different articles get different images
 */
export function generateImagePrompts(
  title: string,
  content: string,
  language: "id" | "en" = "en",
): string[] {
  // Extract main topics from title and content
  const keywords = extractKeywords(title, content);

  // Add randomization variations to avoid duplicate images across articles
  const variations = [
    "professional modern minimalist clean",
    "creative abstract artistic",
    "modern technology digital",
    "professional design innovation",
    "contemporary elegant modern",
  ];

  const variationsId = [
    "profesional modern minimalis clean",
    "kreatif abstrak artistik",
    "modern teknologi digital",
    "desain profesional inovasi",
    "kontemporer elegan modern",
  ];

  // Use consistent but different variation for each keyword position
  // This ensures same article topic + position gets same image, but different topics get different images
  const selectedVariations = language === "id" ? variationsId : variations;

  return keywords.slice(0, 3).map((keyword, idx) => {
    const variation = selectedVariations[idx % selectedVariations.length];
    return `${keyword} ${variation}`;
  });
}

/**
 * Extract keywords for image search from article title and content
 */
function extractKeywords(title: string, content: string): string[] {
  const combined = `${title} ${content}`;

  // Simple keyword extraction - take title words and first section headers
  const titleWords = title
    .split(" ")
    .filter((w) => w.length > 4)
    .slice(0, 3);

  const headerMatch = content.match(/^#+\s+(.+?)$/gm);
  const headers =
    headerMatch
      ?.map((h) => h.replace(/^#+\s+/, "").split(" ")[0])
      .slice(0, 2) || [];

  return [...titleWords, ...headers].filter(Boolean);
}

/**
 * Format article content with embedded images
 * Adds images to the markdown content
 */
export function embedImagesInContent(
  content: string,
  images: BlogArticleImage[],
): string {
  if (!images.length) return content;

  // Add featured image at the top
  let result = `![${images[0]?.alt}](${images[0]?.url})\n\n${content}`;

  // Add images between sections (if you have multiple images)
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
 * Currently a placeholder - integrate with your storage solution
 * Options: Cloudinary, Firebase Storage, AWS S3, Vercel Blob, etc.
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
  return data.url;
}
