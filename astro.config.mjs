// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL and BASE_PATH are set by the GitHub Pages workflow (from actions/configure-pages),
// so the build works both on the custom domain and on a username.github.io/repo preview URL.
export default defineConfig({
  site: process.env.SITE_URL || 'https://mymathsmentor.co.uk',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
