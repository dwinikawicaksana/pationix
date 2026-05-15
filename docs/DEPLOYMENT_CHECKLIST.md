# Deployment & Setup Checklist

## Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# ============================================
# REQUIRED - Content Generation
# ============================================
GOOGLE_API_KEY=sk-****your_google_api_key****

# ============================================
# OPTIONAL - Image Generation (AI)
# ============================================
# Get from: https://replicate.com
REPLICATE_API_TOKEN=****your_replicate_token****

# ============================================
# OPTIONAL - Image Services (Unsplash)
# ============================================
# Get from: https://unsplash.com/oauth/applications
# Increases rate limit from 50 to 5000 requests/hour
UNSPLASH_ACCESS_KEY=****your_unsplash_key****

# ============================================
# OPTIONAL - Analytics & Monitoring
# ============================================
NEXT_PUBLIC_SITE_URL=https://paitonix.com
```

### Getting API Keys

#### Google API Key (REQUIRED)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "Generative Language API"
4. Create API key (not OAuth)
5. Copy key to `GOOGLE_API_KEY`

#### Replicate API Token (OPTIONAL)

1. Go to [Replicate.com](https://replicate.com)
2. Sign up and create account
3. Go to [API Token page](https://replicate.com/account/api-tokens)
4. Copy token to `REPLICATE_API_TOKEN`

#### Unsplash Access Key (OPTIONAL)

1. Go to [Unsplash Developers](https://unsplash.com/oauth/applications)
2. Create new application
3. Copy "Access Key" to `UNSPLASH_ACCESS_KEY`

## Pre-Deployment Checklist

### Code Quality

- [ ] Run `npm run build` - No build errors
- [ ] Run `npm run lint` - No lint errors
- [ ] Test locally with `npm run dev`

### Testing Checklist

- [ ] Blog articles generate successfully
- [ ] Images appear in blog posts
- [ ] OG meta tags show in social preview
- [ ] Sitemap generates at `/sitemap.xml`
- [ ] Robots.txt accessible at `/robots.txt`
- [ ] Dark mode colors are balanced
- [ ] Animations reduce on mobile
- [ ] Performance metrics acceptable

### SEO Verification

- [ ] Homepage has proper metadata
- [ ] Blog posts have dynamic metadata
- [ ] All pages have canonical URLs
- [ ] No 404 errors in sitemap
- [ ] Mobile responsiveness passes tests

### Performance Targets

- [ ] Lighthouse Performance: 90%+
- [ ] Lighthouse SEO: 100%
- [ ] Lighthouse Accessibility: 90%+
- [ ] First Contentful Paint: < 2.5s
- [ ] Largest Contentful Paint: < 2.5s
- [ ] Cumulative Layout Shift: < 0.1

### Security Checklist

- [ ] All API keys in `.env.local` (not in git)
- [ ] `.env.local` added to `.gitignore`
- [ ] Security headers set in Next.js config
- [ ] No sensitive data in public files
- [ ] HTTPS enabled in production

## Deployment Steps

### 1. Prepare Repository

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Verify no build errors
npm run lint
```

### 2. Set Environment Variables

```bash
# In your deployment platform (Vercel, Netlify, etc.)
# Add all required environment variables from .env.local
```

### 3. Deploy

```bash
# Push to main branch
git add .
git commit -m "Website improvements: SEO, performance, blog enhancements"
git push origin main

# Wait for deployment to complete
# Verify at your production URL
```

### 4. Post-Deployment Verification

#### Verify Sitemap

```bash
curl -I https://paitonix.com/sitemap.xml
# Should return 200 OK
```

#### Verify Robots.txt

```bash
curl -I https://paitonix.com/robots.txt
# Should return 200 OK
```

#### Check Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Submit sitemap: `https://paitonix.com/sitemap.xml`
3. Monitor indexing status

#### Test Blog Post OG Tags

1. Generate a blog post
2. Publish it
3. Use [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
4. Paste blog post URL
5. Verify OG tags appear correctly

#### Monitor Performance

1. Use [Lighthouse](https://developers.google.com/web/tools/lighthouse)
2. Check [Core Web Vitals](https://web.dev/vitals/)
3. Monitor in Google Search Console

## File Structure Verification

After deployment, verify these files exist:

```
✅ /app/sitemap.ts - Generates sitemap.xml
✅ /app/blog/layout.tsx - Blog metadata generation
✅ /public/robots.txt - Search engine directives
✅ /lib/imageUsageTracker.ts - Image tracking
✅ /lib/imageService.ts - Enhanced image service
✅ /lib/blogService.ts - Blog management
✅ /lib/blogGenerator.ts - AI content generation
✅ /.blog-data.json - Article storage (auto-created)
✅ /.blog-images-usage.json - Image tracking (auto-created)
```

## Troubleshooting Deployment

### Issue: Build fails

**Solution**:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Issue: SEO tags not working

**Solution**:

1. Check if blog post is published
2. Wait 24 hours for Google indexing
3. Verify in Google Search Console

### Issue: Images not loading

**Solution**:

1. Check API keys are set correctly
2. Verify Unsplash API is working
3. Check image URLs are valid

### Issue: Animations causing slowness

**Solution**:

1. Reduce animation complexity
2. Enable CSS optimization
3. Use `shouldReduceMotion` flag

## Production Monitoring

### Weekly Checks

- [ ] Check Lighthouse scores
- [ ] Review Google Search Console
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links
- [ ] Review error logs

### Monthly Review

- [ ] Analyze blog performance metrics
- [ ] Review image usage statistics
- [ ] Update blog content strategy
- [ ] Check search rankings

## Rollback Procedure

If issues occur after deployment:

```bash
# Revert to previous version
git revert HEAD
git push origin main

# Or revert to specific commit
git reset --hard commit_hash
git push -f origin main
```

## Performance Optimization Tips

1. **Image Optimization**
   - Use WebP format when possible
   - Compress before upload
   - Use responsive images

2. **Animation Optimization**
   - Use `shouldReduceMotion` flag
   - Limit simultaneous animations
   - Use GPU acceleration

3. **Code Optimization**
   - Code split large components
   - Lazy load below-the-fold content
   - Minimize third-party scripts

4. **Database Optimization**
   - Keep `.blog-data.json` size reasonable
   - Archive old records periodically
   - Cleanup unused images

## Support Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Google Search Console Help](https://support.google.com/webmasters)
- [Web Vitals Guide](https://web.dev/vitals/)

## Useful Commands

```bash
# Build and test locally
npm run build
npm run start

# Development mode
npm run dev

# Lint code
npm run lint

# Generate blog article (if setup)
# See BLOG_QUICK_START.md

# View build output
npm run analyze
```

## Next Steps After Deployment

1. **Monitor performance** - Track metrics for 1 week
2. **Optimize based on data** - Make adjustments as needed
3. **Generate content** - Start creating blog posts
4. **Promote content** - Share blog posts on social media
5. **Gather feedback** - Collect user feedback
6. **Iterate** - Make continuous improvements

---

**Last Updated**: May 15, 2026
**Deployment Version**: 1.0
