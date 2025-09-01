import { useEffect, useRef } from "preact/hooks";
import { JSX } from "preact";

interface SVGDrawingProps
  extends Omit<JSX.SVGAttributes<SVGSVGElement>, "onDragEnd"> {
  children: preact.ComponentChildren;
  onDrawingDragEnd: (
    d: string,
    transform: string | null,
    index: number,
  ) => void;
  draggableSelectors?: string;
}

export default function SVGDrawing({
  children,
  onDrawingDragEnd,
  draggableSelectors = ".draggable",
  ...rest
}: SVGDrawingProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    let selectedElement: SVGGraphicsElement | null = null;
    let dragX = 0;
    let dragY = 0;
    const reTranslate = /translate\s*\(([-+\d.\s,e]+)\)/gi;

    const startDrag = (evt: MouseEvent | TouchEvent) => {
      const target = evt.target as SVGGraphicsElement;
      if (!target.matches(draggableSelectors)) return;

      const touch = (evt as TouchEvent).touches?.[0] ?? (evt as MouseEvent);
      const screenMatrix = svg.getScreenCTM();
      if (!screenMatrix) return;

      selectedElement = target;
      dragX = touch.clientX / screenMatrix.a;
      dragY = touch.clientY / screenMatrix.d;

      const transform = selectedElement.getAttribute("transform") || "";
      const translate = reTranslate.exec(transform);
      if (translate) {
        const [x, y] = translate[1].split(/\s*[,\s]+/).map(parseFloat);
        dragX -= x || 0;
        dragY -= y || 0;
      } else {
        selectedElement.setAttribute(
          "transform",
          `translate(0, 0)${transform}`,
        );
      }
    };

    const drag = (evt: MouseEvent | TouchEvent) => {
      if (!selectedElement) return;

      const touch = (evt as TouchEvent).touches?.[0] ?? (evt as MouseEvent);
      const screenMatrix = svg.getScreenCTM();
      if (!screenMatrix) return;

      const x = touch.clientX / screenMatrix.a - dragX;
      const y = touch.clientY / screenMatrix.d - dragY;

      let transform = selectedElement.getAttribute("transform") || "";
      transform = transform.replace(reTranslate, `translate(${x} ${y})`);
      selectedElement.setAttribute("transform", transform);
    };

    const endDrag = () => {
      if (!selectedElement) return;

      const target = selectedElement as SVGPathElement;
      const d = target.getAttribute("d");
      if (!d) return;

      const transform = target.getAttribute("transform");
      const index = Array.from(
        svg.querySelectorAll<SVGPathElement>(draggableSelectors),
      ).indexOf(target);

      onDrawingDragEnd(d, transform, index);
      selectedElement = null;
    };

    const opts = { passive: true } as AddEventListenerOptions;
    svg.addEventListener("mousedown", startDrag, opts);
    svg.addEventListener("mousemove", drag, opts);
    svg.addEventListener("mouseup", endDrag, opts);
    svg.addEventListener("touchstart", startDrag, opts);
    svg.addEventListener("touchmove", drag, opts);
    svg.addEventListener("touchend", endDrag, opts);
    svg.addEventListener("touchleave", endDrag, opts);
    svg.addEventListener("touchcancel", endDrag, opts);

    return () => {
      svg.removeEventListener("mousedown", startDrag);
      svg.removeEventListener("mousemove", drag);
      svg.removeEventListener("mouseup", endDrag);
      svg.removeEventListener("touchstart", startDrag);
      svg.removeEventListener("touchmove", drag);
      svg.removeEventListener("touchend", endDrag);
      svg.removeEventListener("touchleave", endDrag);
      svg.removeEventListener("touchcancel", endDrag);
    };
  }, [onDrawingDragEnd, draggableSelectors]);

  return (
    <svg ref={svgRef} {...rest}>
      {children}
    </svg>
  );
}
