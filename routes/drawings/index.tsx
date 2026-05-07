import { Head } from "fresh/runtime";
import { type RouteConfig } from "fresh";
import List from "../../islands/List.tsx";
import ResetDrawings from "../../islands/ResetDrawings.tsx";

export const config: RouteConfig = { routeOverride: "/drawings/" };

export default function Drawings() {
  return (
    <>
      <Head>
        <title key="page-title">Seven Pixels | Drawings</title>
        <meta
          name="description"
          content="Drawings that can be edited in the browser via drag and drop scalable vector graphics. Each drawing is a portrait based on seven pixel stroke"
        />
      </Head>
      <article>
        <header class="drawings-header">
          <h1>Drawings</h1>
          <a href="/" class="single-link">
            Home
          </a>
          <ResetDrawings />
        </header>
        <List />
      </article>
    </>
  );
}
