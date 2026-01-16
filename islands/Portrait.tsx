import { useCallback, useEffect, useRef } from "preact/hooks";
import { updateDrawings } from "../signals/DrawingsState.ts";
import { Drawing, PathItem } from "../interfaces/drawing.model.ts";
import { useDraggable } from "../hooks/useDraggable.ts";

export default function Portrait({
  active,
  name,
  viewBox,
  title,
  paths,
}: Drawing) {
  const svgRef = useRef<SVGSVGElement>(null);

  const handleDragEnd = useCallback(
    (element: SVGElement, transform: string) => {
      const d = element.getAttribute("d");
      if (!d) return;

      const getPath = (item: PathItem) => item.attributes.d === d;
      const index = paths.findIndex(getPath);

      updateDrawings(name, d, index, transform);
    },
    [name, paths],
  );

  const {
    handleDragStart,
    handleDrag,
    handleDragEnd: onDragEnd,
  } = useDraggable({
    onDragEnd: handleDragEnd,
  });

  const onMouseDown = useCallback(
    (evt: MouseEvent) => {
      if (!svgRef.current) return;
      handleDragStart(evt, svgRef.current);
    },
    [handleDragStart],
  );

  const onTouchStart = useCallback(
    (evt: TouchEvent) => {
      if (!svgRef.current) return;
      handleDragStart(evt, svgRef.current);
    },
    [handleDragStart],
  );

  const onMouseMove = useCallback(
    (evt: MouseEvent) => {
      if (!svgRef.current) return;
      handleDrag(evt, svgRef.current);
    },
    [handleDrag],
  );

  const onTouchMove = useCallback(
    (evt: TouchEvent) => {
      if (!svgRef.current) return;
      handleDrag(evt, svgRef.current);
    },
    [handleDrag],
  );

  useEffect(() => {
    const handleDocumentMouseUp = () => onDragEnd();
    const handleDocumentTouchEnd = () => onDragEnd();

    document.addEventListener("mouseup", handleDocumentMouseUp);
    document.addEventListener("touchend", handleDocumentTouchEnd);
    document.addEventListener("touchcancel", handleDocumentTouchEnd);

    return () => {
      document.removeEventListener("mouseup", handleDocumentMouseUp);
      document.removeEventListener("touchend", handleDocumentTouchEnd);
      document.removeEventListener("touchcancel", handleDocumentTouchEnd);
    };
  }, [onDragEnd]);

  return (
    <svg
      role="application"
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onDragEnd}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onDragEnd}
    >
      <title>{title}</title>
      {paths.map((item: PathItem, index: number) => {
        if (item.name !== "path") {
          return null;
        }
        return (
          <path
            className="draggable"
            tabindex={active ? 0 : -1}
            key={index}
            d={item.attributes.d}
            transform={item.attributes.transform}
          />
        );
      })}
    </svg>
  );
}
