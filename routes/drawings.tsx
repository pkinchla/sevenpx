import { Head } from "$fresh/runtime.ts";
import List from "../islands/List.tsx";
import ResetDrawings from "../islands/ResetDrawings.tsx";

export default function Drawings() {
  return (
    <>
      <Head>
        <title>Seven Pixels | Drawings</title>
        <meta
          name="description"
          content="Drawings that can be edited in the browser via drag and drop scalable vector graphics. Each drawing is a portrait based on seven pixel stroke"
        />
      </Head>
      <article>
        <header className="drawings-header">
          <h1>Drawings</h1>
          <a href="/" as="/" className="single-link d-block">
            Home
          </a>
          <ResetDrawings />
        </header>
        <List />
      </article>
    </>
  );
}
