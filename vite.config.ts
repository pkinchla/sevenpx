import { defineConfig, type Plugin } from "vite";
import { fresh } from "@fresh/plugin-vite";
import { cloudflare } from "@cloudflare/vite-plugin";

// Cache headers for Cloudflare static assets. Emitted into the client build
// rather than kept in static/, so Fresh doesn't try to serve the file itself.
const HEADERS =
  `# Vite output: filenames are content-hashed, so they never change.
/assets/*
  Cache-Control: public, max-age=31536000, immutable

/inter-variable.woff2
  Cache-Control: public, max-age=31536000, immutable
`;

function cloudflareHeaders(): Plugin {
  return {
    name: "cloudflare-headers",
    apply: "build",
    applyToEnvironment: (env) => env.name === "client",
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "_headers", source: HEADERS });
    },
  };
}

export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    fresh(),
    cloudflareHeaders(),
    // Fresh's dev server doesn't run inside the Cloudflare plugin's workerd
    // runner (duplicate Fresh module instances), so dev uses Fresh's own
    // server and the Worker is only built for build/preview/deploy. The Worker
    // reuses Fresh's `ssr` environment so there is a single server build.
    (command === "build" || isPreview) &&
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
}));
