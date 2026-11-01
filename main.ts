import { App, staticFiles, trailingSlashes } from "fresh";
import config from "./fresh.config.ts";

export const app = new App(config)
  .use((ctx) => {
    // Redirect www.sevenpx.design to the apex domain.
    if (ctx.url.hostname.startsWith("www.")) {
      const url = new URL(ctx.url);
      url.hostname = url.hostname.slice("www.".length);
      return Response.redirect(url, 301);
    }
    return ctx.next();
  })
  .use(staticFiles())
  .use(trailingSlashes("always"))
  .fsRoutes();
