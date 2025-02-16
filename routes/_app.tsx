import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://use.typekit.net/rtx5wed.css" />
        <link rel="stylesheet" href={asset("/app.css")} />
      </head>
      <body>
        <header>
          <a class="visually-hidden" href="#main-content">
            Skip to main content
          </a>
          <Logo />
        </header>

        <main id="main-content">
          <Component />
        </main>
      </body>
    </html>
  );
}
