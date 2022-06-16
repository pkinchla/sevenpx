import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en-US">
      <Head>
        <link
          rel="preload"
          href="https://use.typekit.net/rtx5wed.css"
          as="style"
        />
        <link
          rel="stylesheet"
          href="https://use.typekit.net/rtx5wed.css"
          media="print"
          onLoad="this.media='all'"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
