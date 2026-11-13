import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: process.env.VITE_BASE || (process.env.GITHUB_PAGES === 'true' ? '/Echo_Loop/' : '/'),
  plugins: [react(), tailwindcss()],
  build: { target: 'es2022', sourcemap: true },
  test: { environment: 'jsdom', globals: true }
});
