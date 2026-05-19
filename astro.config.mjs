// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import { process } from 'zod/v4/core';
import relativeLinks from 'astro-relative-links';

const SERVER_PORT = 3000;
const LOCALHOST_URL = `http://localhost:${SERVER_PORT}`;

const LIVE_URL = 'https://astro-react-tailwindcss-starter.vercel.app';


let BASE_URL = LOCALHOST_URL;


// https://astro.build/config
export default defineConfig({
  // @ts-ignore
  site: BASE_URL,
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), relativeLinks()],
});