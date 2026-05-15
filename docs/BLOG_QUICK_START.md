# Blog System - Quick Start Guide

## Using the Enhanced Blog System

### 1. Accessing the Admin Dashboard

Navigate to `/admin/blog` to access the blog management dashboard.

### 2. Creating Blog Articles

#### Single Article Generation

1. Enter a topic in the "Topic" field
2. Select a writing style:
   - **Technical**: For developer/technical content
   - **Business**: For business and strategy content
   - **Casual**: For informal, conversational content
3. Choose language: Indonesian (id) or English (en)
4. **Optional**: Check "Include Images" to automatically fetch images
5. Click "Generate Article"

#### Bulk Article Generation

1. Enter multiple topics (one per line) in the "Bulk Topics" field
2. Select style and language
3. Check image inclusion if desired
4. Click "Generate Bulk"
5. Wait for all articles to generate (takes 2-3 minutes for multiple articles)

### 3. Article Management

#### Publishing Articles

1. Find the article in the "Articles" list
2. Click "Publish" button
3. Article is now visible on the blog and included in sitemap

#### Categorizing Articles

Articles are automatically categorized. Current categories:

- **Technology** - Tech topics, AI, Development
- **Design** - UI/UX, Product Design
- **Business** - Strategy, Growth, Management
- **Development** - Code, Architecture
- **AI & Automation** - AI tools, Automation
- **Product Strategy** - Product management
- **Marketing** - Marketing, Growth

To change category later, you can edit the article's JSON in `.blog-data.json`.

### 4. Image System Features

#### Automatic Image Sourcing

The system uses a smart image selection strategy:

1. **Tries AI generation first** (if `REPLICATE_API_TOKEN` is set)
2. **Falls back to Unsplash** if AI generation fails
3. **Prevents duplicate thumbnails** - Recently used images are excluded

#### Image Uniqueness Tracking

The system tracks:

- Which images are used in which articles
- When images were last used
- Source of images (AI, Unsplash, etc.)
- Statistics on image usage

To view image statistics:

```bash
# In your Node environment
const { getImageStats } = require('./lib/imageUsageTracker');
console.log(getImageStats());
```

#### Enabling AI Image Generation

1. Get a Replicate API token from https://replicate.com
2. Add to `.env.local`:
   ```
   REPLICATE_API_TOKEN=your_token_here
   ```
3. When generating articles, AI images will be used automatically

### 5. Blog Article Metadata

Each article includes:

- **Title** - SEO-optimized article title
- **Slug** - URL-friendly identifier
- **Excerpt** - 50-100 word summary
- **Content** - Full markdown content with images
- **Keywords** - Search optimization keywords
- **Category** - Content categorization
- **Read Time** - Estimated reading time
- **Language** - Indonesian or English
- **Featured Image** - Article thumbnail
- **Tags** - Additional categorization

### 6. Blog Post URL Structure

Generated blog posts are accessible at:

```
https://paitonix.com/blog/{slug}
```

Example:

```
https://paitonix.com/blog/ai-powered-development
```

### 7. SEO Features Included

#### Automatic SEO Optimization

- ✅ OG Meta Tags (for social sharing)
- ✅ Twitter Card tags
- ✅ Article published date
- ✅ Keywords metadata
- ✅ Author information
- ✅ Featured image in meta tags

#### Search Visibility

- Articles automatically appear in `/sitemap.xml`
- Only published articles are indexed
- Google, Bing, and other search engines can discover content
- Admin pages are excluded from search (noindex)

### 8. Troubleshooting

#### Issue: Articles not generating

**Solution**:

- Check `GOOGLE_API_KEY` is set in `.env.local`
- Ensure Google Generative AI API is enabled
- Check rate limits on API

#### Issue: Images not appearing

**Solution**:

- Ensure "Include Images" is checked when generating
- If AI images fail, Unsplash fallback should work
- Check `UNSPLASH_ACCESS_KEY` for Unsplash
- Images require internet connection

#### Issue: Duplicate images appearing

**Solution**:

- Image deduplication is automatic
- Images from last 7 days are excluded from selection
- System tracks all image usage in `.blog-images-usage.json`

#### Issue: Category not showing correctly

**Solution**:

- Categories are auto-detected by AI
- To manually set category, edit `.blog-data.json`
- Available categories:
  ```
  technology, design, business, development,
  ai-automation, product-strategy, marketing
  ```

### 9. Best Practices

#### Article Generation

- ✅ Generate one article at a time for initial testing
- ✅ Review content quality before publishing
- ✅ Keep topics specific and focused
- ✅ Use consistent language per article

#### Image Management

- ✅ Let the system choose images (smart selection)
- ✅ Monitor image statistics to track trends
- ✅ Images auto-rotate to prevent repetition

#### Publishing

- ✅ Review SEO before publishing
- ✅ Test article on mobile and desktop
- ✅ Verify images load correctly
- ✅ Check that OG meta tags appear in social preview

### 10. Advanced Usage

#### Accessing Blog Data

Blog data is stored in `.blog-data.json`:

```json
{
  "article-slug-timestamp": {
    "id": "article-slug-1715828400000",
    "title": "Article Title",
    "slug": "article-title",
    "category": "technology",
    "published": true,
    "createdAt": "2024-05-15T10:00:00Z",
    "featured Image": "https://images.unsplash.com/...",
    ...
  }
}
```

#### Image Usage Statistics

Access image statistics:

```javascript
import { getImageStats } from "@/lib/imageUsageTracker";

const stats = getImageStats();
// Returns:
// {
//   totalImages: 12,
//   totalUsages: 35,
//   bySource: { unsplash: 25, ai: 10, external: 0 },
//   mostUsedImageUrl: "https://...",
//   averageImagesPerArticle: 2.9
// }
```

#### Programmatic Article Creation

```typescript
import { saveBlogArticle, BLOG_CATEGORIES } from "@/lib/blogService";

const article = await saveBlogArticle(
  generatedArticle,
  BLOG_CATEGORIES.Technology.id,
  ["tag1", "tag2"],
);
```

## Support

For issues or questions:

1. Check the main [WEBSITE_IMPROVEMENTS.md](./WEBSITE_IMPROVEMENTS.md) guide
2. Review environment variables
3. Check logs for API errors
4. Test with a single article first before bulk operations

## Next Steps

1. **Generate your first article** - Try creating a single article
2. **Monitor performance** - Use Lighthouse to measure improvements
3. **Test blog visibility** - Check Google Search Console
4. **Gather analytics** - Monitor blog traffic and engagement
5. **Optimize based on data** - Adjust topics and categories based on performance

---

**Last Updated**: May 15, 2026
