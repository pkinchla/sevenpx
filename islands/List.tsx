import drawings from "../signals/DrawingsState.ts";
import { Drawing } from "../interfaces/drawing.model.ts";
import ListItem from "./ListItem.tsx";

export default function List() {
  return (
    <ul class="drawings">
      {drawings.value.map((drawing: Drawing) => {
        return (
          <ListItem
            key={drawing.title}
            index={drawing.title}
            drawing={drawing}
          />
        );
      })}
    </ul>
  );
}
