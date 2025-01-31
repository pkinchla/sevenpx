import postcss from "postcss";
import autoprefixer from "autoprefixer";
import postcssImport from "postcss-import";
import postcssCsso from "postcss-csso";

const INPUT_PATH = "./static/css/main.css";
const OUTPUT_PATH = "./static/app.css";

const file = await Deno.readTextFile(INPUT_PATH);

await postcss([autoprefixer, postcssImport, postcssCsso])
  .process(file, { from: INPUT_PATH, to: OUTPUT_PATH })
  .then((result) => result.css)
  .then((css) => Deno.writeFile(OUTPUT_PATH, new TextEncoder().encode(css)));
