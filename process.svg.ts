import { Drawing } from "./interfaces/drawing.model.ts";

import { parse } from "npm:svgson@5.3.1";

const paths: Drawing[] = [];
const dir = import.meta.dirname!;

function getExtension(filename: string) {
  return filename.split(".").pop();
}

for await (const fileName of Deno.readDir(`${dir}/svg`)) {
  const fileType = getExtension(fileName.name);

  if (fileType === "svg") {
    const decoder = new TextDecoder("utf-8");
    const rawFile = await Deno.readFile(`${dir}/svg/${fileName.name}`);
    const contents = decoder.decode(rawFile);

    await parse(contents).then((result) => {
      paths.push({ ...result, title: fileName.name.split(".")[0] } as Drawing);
    });
  }
}

await Deno.writeTextFile(`${dir}/svgs.json`, JSON.stringify(paths));
