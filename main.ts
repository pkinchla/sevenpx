import "$std/dotenv/load.ts";
import { App, staticFiles, trailingSlashes } from "fresh";
import config from "./fresh.config.ts";

export const app = new App(config)
  .use(staticFiles())
  .use(trailingSlashes("always"));

await app.fsRoutes();

if (import.meta.main) {
  await app.listen({ port: 3000 });
}
