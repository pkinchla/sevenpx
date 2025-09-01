import { Drawing } from "../interfaces/drawing.model.ts";
import { updateDrawings } from "../signals/DrawingsState.ts";
import SVGDrawing from "./SVGDrawing.tsx";
import Path from "./Path.tsx";

export default function Portrait({
  active,
  name,
  viewBox,
  title,
  paths,
}: Drawing) {
  const handleDrawingDragEnd = (
    d: string,
    transform: string | null,
    index: number,
  ) => {
    updateDrawings(name, d, index, transform || "");
  };

  return (
    <SVGDrawing
      role="application"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onDrawingDragEnd={handleDrawingDragEnd}
    >
      <title>{title}</title>
      {paths.map((item, index) =>
        item.name === "path"
          ? (
            <Path
              key={index}
              d={item.attributes.d}
              transform={item.attributes.transform}
              isActive={active}
            />
          )
          : null
      )}
    </SVGDrawing>
  );
}
