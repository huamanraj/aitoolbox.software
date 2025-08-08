import { MetadataRoute } from 'next';

const URL = 'https://aitoolbox.software';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/blog-writer',
    '/chatbot',
    '/code-explainer',
    '/email-writer',
    '/grammar-fixer',
    '/idea-generator',
    '/image-generator',
    '/logo-generator',
    '/prompt-generator',
    '/resume-builder',
    '/text-summarizer',
    '/youtube-summarizer',
    '/startup-idea-generator',
    '/youtube-idea-generator',
    '/blog-idea-generator',
    '/app-idea-generator',
    '/product-idea-generator',
    '/how-to-generate-ai-images-for-free',
    '/how-to-generate-ghibhli-style-images',
    '/guide-to-ai-blog-writer',
    '/how-to-build-ai-chatbot',
    '/ai-code-explainer-guide',
    '/ai-email-writer-guide',
    '/ai-grammar-fixer-guide',
    '/ai-idea-generator-guide',
    '/ai-logo-generator-guide',
    '/ai-resume-builder-guide',
    '/ai-text-summarizer-guide',
    '/ai-youtube-summarizer-guide',
    '/ai-bio-generator',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  return [...routes];
} 