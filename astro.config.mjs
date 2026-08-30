// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import relativeLinks from 'astro-relative-links';
import sitemap from '@astrojs/sitemap';

// Astro's default dev server port (see README "Getting Started").
const DEV_URL = 'http://localhost:4321';

// TODO: confirm this is still the right domain. It comes from the legacy site
// linked in prompts/roadmap.md, but that conflicts with the Rochester, NY
// contact info used elsewhere on this site (contact.astro) - double check
// which campus/domain this site is actually for before shipping.
const PRODUCTION_URL = 'https://ritmun.ritdubai.ae';

// `site` must be an absolute, production URL so that the sitemap, canonical
// links, and Open Graph tags resolve correctly. Only `astro build` (used for
// the real deploy) gets the production URL; `dev`/`preview` keep localhost.
// (`process` is a Node.js global here, no import needed.)
const isProductionBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  site: isProductionBuild ? PRODUCTION_URL : DEV_URL,
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [react(), relativeLinks(), sitemap()],
});
