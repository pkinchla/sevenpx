import { App, staticFiles, trailingSlashes } from "fresh";
import config from "./fresh.config.ts";

export const app = new App(config)
  .use(staticFiles())
  .use(trailingSlashes("always"))
  .fsRoutes();
