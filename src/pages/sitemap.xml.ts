import type { APIRoute } from 'astro';
import { siteConfig } from '../data/site.mjs';

export const prerender = true;

export const GET: APIRoute = () => new Response(
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteConfig.url}</loc>
  </url>
</urlset>
`,
  { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
);
