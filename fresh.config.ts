import { defineConfig } from "$fresh/server.ts";

export default defineConfig({ port: 3000, router: { trailingSlash: true } });
