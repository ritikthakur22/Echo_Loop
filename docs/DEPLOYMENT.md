# Vercel deployment guide

1. Push the repository to a Git provider and import it in Vercel.
2. Select the Vite framework preset, or use build command `npm run build` and output directory `dist`.
3. Deploy. Vercel serves the application over HTTPS, which is required for microphone access.
4. Update `public/sitemap.xml` and the Open Graph URL metadata to the final public domain before the production launch.

The included `vercel.json` ensures the React public routes resolve on direct visits and prevents stale service-worker caching. The app has no backend environment variables and no audio-related server configuration. Validate microphone permission, service-worker installation, and offline reload on the production domain.
