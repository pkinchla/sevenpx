import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getContent } from "../utils/server.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const content = await getContent();

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
      <div className="content-block">
        <h1 class="visually-hidden">Home Page</h1>
        {data.hasError
          ? (
            <>
              <h2>Error</h2>
              <p>{data.error}</p>
            </>
          )
          : <div dangerouslySetInnerHTML={{ __html: data.copy }} />}
        <a href="/drawings/" class="single-link">View Drawings →</a>
      </div>
    </>
  );
}
