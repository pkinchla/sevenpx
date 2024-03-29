import { Handlers, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getContent } from "../utils/server.ts";
import Logo from "../components/Logo.tsx";

export const handler: Handlers = {
  async GET(_, ctx) {
    const content = await getContent();

    if (content.hasError) {
      return ctx.render(null);
    }
    return ctx.render(content);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>Seven Pixels | Home</title>
        <meta
          name="description"
          content="A small application about drawing, collage and editing scalable vector graphic portraits in the browser. Side project of Paul Kinchla."
        />
      </Head>
      <main className="intro-container">
        <div className="intro base-layout">
          <h1 className="page-title title">
            <Logo />
          </h1>
          <div className="copy">
            {data.hasError ? (
              <p>{data.error}</p>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: data.copy }} />
            )}
            <a href="/drawings/" className="single-link">
              View Drawings &rarr;
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
