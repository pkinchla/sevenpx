import { Head } from "$fresh/runtime.ts";
import List from "../islands/List.tsx";
import ResetDrawings from "../islands/ResetDrawings.tsx";

export default function Drawings() {
  return (
    <>
      <Head>
        <title>Seven Pixels | Drawings</title>
      </Head>
      <article>
        <header className="drawings-header">
          <h1>Drawings</h1>
          <a href="/" as="/" className="single-link d-block mb-1">
            Home
          </a>
          <ResetDrawings />
        </header>
        <List />
      </article>
    </>
  );
}
