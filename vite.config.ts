import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

export default defineConfig({
  logLevel: "info",
  build: {
    minify: false,
  },
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      srcDir: "./src",
      mode: "development",
      strategies: "injectManifest",
      filename: "prompt-sw.ts",
      scope: "/",
      base: "/",
      manifest: {
        short_name: "My Dashboard",
        name: "My Dashboard",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      injectManifest: {
        globPatterns: ["client/**/*.{js,css,ico,png,svg,webp,woff,woff2}"],
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/",
      },
      // if you have shared info in svelte config file put in a separate module and use it also here
      kit: {},
      workbox: {
        manifestTransforms: [
          async (manifestEntries) => {
            const scope = "/";

            console.info("Precache Manifest Entries:");
            const manifest = manifestEntries
              .filter(
                ({ url }) =>
                  // Remove paths that should not be cached:
                  url !== "client/vite-manifest.json" &&
                  url !== "prerendered/fallback.html",
                // && url !== 'client/manifest.webmanifest' && !url.endsWith('sw.js') && !url.startsWith('workbox-')
              )
              .map((e) => {
                // Adjust paths to match what the adapter server understands:
                const url1 = e.url;
                let url = e.url;
                if (url.startsWith("/")) url = url.slice(1);
                if (url.startsWith("client/")) url = url.slice(7);
                if (url.startsWith("prerendered/pages/")) url = url.slice(18);

                // router paths
                if (url && url.endsWith(".html")) {
                  url = url === "index.html"
                    ? ""
                    : `${url.substring(0, url.lastIndexOf("."))}`;
                }
                e.url = scope + url; // Canonical URL starts with base
                console.info(`  ${url1.padEnd(100)} => ${JSON.stringify(e)}`);
                return e;
              });
            return { manifest };
          },
        ],
      },
    }),
  ],
});
