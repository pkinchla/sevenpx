import { signal } from '@preact/signals';
import svgs from '../svgs.json' assert { type: 'json' };

const drawings = signal(svgs);

export function updateDrawings(title, path, index, transform) {
  const copy = [...drawings.value];

  // filter out target svg based on title
  const target = copy.filter((item) => {
    return item.title === title;
  });

  // update appropriate path
  target[0].children.map((item, path_index) => {
    if (index === path_index) {
      item.attributes.d = path;
      item.attributes.transform = transform;
    }
  });

  drawings.value = copy;
}

export default drawings;
