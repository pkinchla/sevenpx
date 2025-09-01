import { IS_BROWSER } from "$fresh/runtime.ts";
import { Signal, signal } from "@preact/signals";
import svgs from "../svgs.json" with { type: "json" };
import { Drawing } from "../interfaces/drawing.model.ts";

const setUpSignal = (): Signal => {
  if (!IS_BROWSER) {
    return signal(svgs);
  } else {
    const storage = localStorage.getItem("drawings");
    if (storage) {
      return signal(JSON.parse(storage));
    } else {
      return signal(svgs);
    }
  }
};

const drawings = setUpSignal();

export function updateDrawings(
  title: string,
  path: string,
  index: number,
  transform: string,
): void {
  const copy = [...drawings.value];

  // filter out target svg based on title
  const target = copy.filter((item) => {
    return item.title === title;
  });

  // update appropriate path
  target[0].children.map((item: Drawing, path_index: number) => {
    if (index === path_index) {
      item.attributes.d = path;
      item.attributes.transform = transform;
    }
  });

  IS_BROWSER && localStorage.setItem("drawings", JSON.stringify(copy));
  drawings.value = copy;
}

export default drawings;
