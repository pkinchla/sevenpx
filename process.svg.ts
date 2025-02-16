import { Drawing } from "./interfaces/drawing.model.ts";

import { parse } from "npm:svgson";

const paths: Drawing[] = [];

function getExtension(filename: string) {
  return filename.split(".").pop();
}

for await (const fileName of Deno.readDir("./svg")) {
  const fileType = getExtension(fileName.name);

  if (fileType === "svg") {
    const decoder = new TextDecoder("utf-8");
    const rawFile = await Deno.readFile(`./svg/${fileName.name}`);
    const contents = decoder.decode(rawFile);

    await parse(contents).then((result) => {
      paths.push({ ...result, title: fileName.name.split(".")[0] });
    });
  }
}

await Deno.writeTextFile("./svgs.json", JSON.stringify(paths));
