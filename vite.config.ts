import { defineConfig } from "vite";
import { fresh } from "@fresh/plugin-vite";
import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig(({ command, isPreview }) => ({
  plugins: [
    fresh(),
    // Fresh's dev server doesn't run inside the Cloudflare plugin's workerd
    // runner (duplicate Fresh module instances), so dev uses Fresh's own
    // server and the Worker is only built for build/preview/deploy. The Worker
    // reuses Fresh's `ssr` environment so there is a single server build.
    (command === "build" || isPreview) &&
    cloudflare({ viteEnvironment: { name: "ssr" } }),
  ],
}));
