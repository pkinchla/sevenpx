import { Handlers, type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";
import Vector from "../islands/VectorCollage.tsx";

export const handler: Handlers = {
  GET(_, ctx) {
    const route = ctx.route;

    return ctx.render(route);
  },
};
export default function App({ Component, route }: PageProps) {
  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href={asset("/app.css")} />
      </head>
      <body>
        <header>
          <a class="visually-hidden" href="#main-content">
            Skip to main content
          </a>
          {route === "/" ? <Logo /> : (
            <a href="/" class="home-link">
              <Logo />
            </a>
          )}
        </header>
        <main id="main-content" className={`${route.split("/")[1]}-page`}>
          <Component />
        </main>
        <Vector />
      </body>
    </html>
  );
}
