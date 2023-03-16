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
        manifestTransforms: [
          async (entries) => {
            entries.push({
              url: "/index.html",
              revision: null,
              size: 0,
            });

            // the fallback will be always in .svelte-kit/output/prerendered/fallback.html
            const manifest = entries
              .map((e) => {
                let url = e.url;
                console.log(url);

                if (url.startsWith("client/")) {
                  url = url.slice(7);
                } else if (url.startsWith("prerendered/pages/")) {
                  url = url.slice(18);
                }

                if (url.endsWith(".html")) {
                  if (url.startsWith("/")) {
                    url = url.slice(1);
                  }

                  if (url === "index.html") {
                    url = "/";
                  } else {
                    const idx = url.lastIndexOf("/");
                    if (idx > -1) {
                      // abc/index.html -> abc/?
                      if (url.endsWith("/index.html")) {
                        url = `${url.slice(0, idx)}`;
                      } // abc/def.html -> abc/def/?
                      else {
                        url = `${url.substring(0, url.lastIndexOf("."))}`;
                      }
                    } else {
                      // xxx.html -> xxx/?
                      url = `${url.substring(0, url.lastIndexOf("."))}`;
                    }
                  }
                }

                e.url = url;

                return e;
              });

            return { manifest };
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "/",
      },
      // if you have shared info in svelte config file put in a separate module and use it also here
      kit: {},
      workbox: {
        mode: "development",
        navigateFallback: null,
      },
    }),
  ],
});
