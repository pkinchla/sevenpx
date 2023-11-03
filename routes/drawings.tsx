import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";
import drawings from "../components/DrawingsSignal.tsx";
import ListItem from "../islands/ListItem.tsx";

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
      <div className="drawing-page base-layout">
        <span className="title">
          <a href="/">
            <Logo />
          </a>
        </span>
        <main>
          <header className="header">
            <h1 className="page-title">Drawings</h1>
            <a href="/" as="/" className="single-link">
              Home
            </a>
          </header>
          <div className="content">
            <ul className="drawings">
              {drawings.value.map((drawing) => {
                return (
                  <ListItem
                    key={drawing.title}
                    index={drawing.title}
                    drawing={drawing}
                  />
                );
              })}
            </ul>
          </div>
        </main>
      </div>
    </>
  );
}
