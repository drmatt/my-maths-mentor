import type { APIRoute } from 'astro';
import { url } from '../lib/url';

const pages = ['/', '/privacy/', '/safeguarding/'];

export const GET: APIRoute = ({ site }) => {
  const entries = pages.map((path) => `  <url><loc>${new URL(url(path), site).href}</loc></url>`).join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
