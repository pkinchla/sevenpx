import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";
import drawings from "../components/DrawingsSignal.tsx";
import ListItem from "../islands/ListItem.tsx";

export default function Drawings() {
  return (
    <>
      <Head>
        <title>Seven Pixels | Drawings</title>
      </Head>
      <div className="drawing-page base-layout">
        <span className="title">
          <a href="/">
            <Logo />
          </a>
        </span>
        <section>
          <header className="header">
            <h1 className="page-title">Drawings</h1>
            <a href="/" as="/" className="single-link">
              Home
            </a>
          </header>
          <div className="content">
            <ul className="drawings">
              {drawings.value.map((drawing, index) => {
                return <ListItem key={index} index={index} drawing={drawing} />;
              })}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
