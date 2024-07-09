import { signal } from "@preact/signals";
import svgs from "../svgs.json" with { type: "json" };
import { Drawing } from "../utils/interfaces/drawing.ts";

const storedDrawings = localStorage.getItem("drawings");
const drawings = storedDrawings ? signal(JSON.parse(storedDrawings)) : signal(svgs);

export function updateDrawings(
  title: string,
  path: string,
  index: string,
  transform: string
) {
  const copy = [...drawings.value];

  // filter out target svg based on title
  const target = copy.filter((item) => {
    return item.title === title;
  });

  // update appropriate path
  target[0].children.map((item: Drawing, path_index: string) => {
    if (index === path_index) {
      item.attributes.d = path;
      item.attributes.transform = transform;
    }
  });
  
  localStorage.setItem("drawings", JSON.stringify(copy));
  drawings.value = copy;

}

export default drawings;
