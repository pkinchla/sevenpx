import { type PageProps } from "fresh";
import { asset } from "fresh/runtime";
import Logo from "../components/Logo.tsx";
import Vector from "../islands/VectorCollage.tsx";

export default function App({ Component, url }: PageProps) {
  const route = url.pathname;

  return (
    <html lang="en-US">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          href="/inter-variable.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
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
        <main id="main-content" class={`${route.split("/")[1]}-page`}>
          <Component />
        </main>
        <Vector />
      </body>
    </html>
  );
}
