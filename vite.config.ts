import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// `base` is read from an env var so the same source can deploy to Vercel/Netlify
// (root path) or GitHub Pages (repo sub-path). See README "Deployment".
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
});
