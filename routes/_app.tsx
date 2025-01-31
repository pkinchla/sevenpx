import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>sevenpx</title>
        <link rel="stylesheet" href={asset("/app.css")} />
        <meta name="robots" content="noindex"></meta>
      </head>
      <body>
        <Component />
      </body>
    </html>
  );
}
