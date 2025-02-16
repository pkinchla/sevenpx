import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { getContent } from "../utils/server.ts";

export const handler: Handlers = {
  async GET(_, ctx) {
    const content = await getContent();

    return content.hasError ? ctx.render(null) : ctx.render(content);
  },
};

export default function Home({ data }: PageProps) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div className="home-content">
        <h1 class="visually-hidden">Home Page</h1>
        {data.hasError
          ? <p>{data.error}</p>
          : <div dangerouslySetInnerHTML={{ __html: data.copy }} />}
      </div>
    </>
  );
}
