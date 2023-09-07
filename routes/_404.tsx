import { Head } from "$fresh/runtime.ts";
import Logo from "../components/Logo.tsx";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="intro-container">
        <div className="intro base-layout">
          <span className="title">
            <a href="/">
              <Logo />
            </a>
          </span>
          <div className="copy">
            <h1>404 - Page not found</h1>
            <p>The page you were looking for doesn't exist.</p>
            <a href="/">Go back home</a>
          </div>
        </div>
      </div>
    </>
  );
}
