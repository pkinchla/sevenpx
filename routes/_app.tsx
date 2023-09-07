import { AppProps } from "$fresh/server.ts";
import { asset, Head } from "$fresh/runtime.ts";
import VectorCollage from "../islands/VectorCollage.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/rtx5wed.css" />
        <link rel="stylesheet" href={asset("/styles.css")} />
        <meta name="view-transition" content="same-origin" />
      </Head>
      <Component />
      <VectorCollage />
    </>
  );
}
