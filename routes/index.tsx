import { Head } from "fresh/runtime";
import { page, type PageProps } from "fresh";
import { getContent } from "../utils/server.ts";

type HomeData = Awaited<ReturnType<typeof getContent>>;

export const handler = {
  async GET() {
    const content = await getContent();
    return page<HomeData>(content);
  },
};

export default function Home({ data }: PageProps<HomeData>) {
  return (
    <>
      <Head>
        <title>Seven Pixels | Home</title>
        <meta
          name="description"
          content="A small application about drawing, collage and editing scalable vector graphic portraits in the browser. Side project of Paul Kinchla."
        />
      </Head>
      <div class="content-block">
        <h1 class="visually-hidden">Home Page</h1>
        {data.hasError
          ? (
            <>
              <h2>Error</h2>
              <p>{data.error}</p>
            </>
          )
          // deno-lint-ignore react-no-danger
          : <div dangerouslySetInnerHTML={{ __html: data.copy ?? "" }} />}
        <a href="/drawings/" class="single-link">View Drawings →</a>
      </div>
    </>
  );
}
