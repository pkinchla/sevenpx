import { useCallback, useRef } from "preact/hooks";

interface DragState {
  selectedElement: SVGElement | null;
  dragX: number;
  dragY: number;
}

interface UseDraggableOptions {
  onDragEnd?: (element: SVGElement, transform: string) => void;
}

const TRANSLATE_REGEX = /translate\s*\(([-+\d.\s,e]+)\)/gi;

export function useDraggable(options: UseDraggableOptions = {}) {
  const dragState = useRef<DragState>({
    selectedElement: null,
    dragX: 0,
    dragY: 0,
  });

  const getScreenMatrix = useCallback((svg: SVGSVGElement) => {
    return svg.getScreenCTM();
  }, []);

  const parseTranslate = useCallback((transform: string | null) => {
    if (!transform) return null;
    TRANSLATE_REGEX.lastIndex = 0;
    return TRANSLATE_REGEX.exec(transform);
  }, []);

  const handleDragStart = useCallback(
    (
      evt: MouseEvent | TouchEvent,
      svg: SVGSVGElement,
    ) => {
      const target = evt.target as SVGElement;

      if (!target.classList.contains("draggable")) {
        return;
      }

      const clientEvent = "touches" in evt ? evt.touches[0] : evt;
      const screenMatrix = getScreenMatrix(svg);

      if (!screenMatrix) return;

      dragState.current.selectedElement = target;
      dragState.current.dragX = clientEvent.clientX / screenMatrix.a;
      dragState.current.dragY = clientEvent.clientY / screenMatrix.d;

      const transform = target.getAttributeNS(null, "transform");
      const translate = parseTranslate(transform);

      if (translate) {
        const digits = translate[1].split(/\s*[,\s]+/);
        dragState.current.dragX -= parseFloat(digits[0] || "0");
        dragState.current.dragY -= parseFloat(digits[1] || "0");
      } else {
        const newTranslate = "translate(0, 0)";
        if (transform) {
          target.setAttributeNS(null, "transform", newTranslate + transform);
        } else {
          target.setAttributeNS(null, "transform", newTranslate);
        }
      }
    },
    [getScreenMatrix, parseTranslate],
  );

  const handleDrag = useCallback(
    (evt: MouseEvent | TouchEvent, svg: SVGSVGElement) => {
      const { selectedElement, dragX, dragY } = dragState.current;

      if (!selectedElement) return;

      const screenMatrix = getScreenMatrix(svg);
      if (!screenMatrix) return;

      const clientEvent = "touches" in evt ? evt.touches[0] : evt;
      const x = clientEvent.clientX / screenMatrix.a - dragX;
      const y = clientEvent.clientY / screenMatrix.d - dragY;

      let transform = selectedElement.getAttributeNS(null, "transform") || "";
      TRANSLATE_REGEX.lastIndex = 0;
      transform = transform.replace(
        TRANSLATE_REGEX,
        `translate(${x} ${y})`,
      );
      selectedElement.setAttributeNS(null, "transform", transform);
    },
    [getScreenMatrix],
  );

  const handleDragEnd = useCallback(() => {
    const { selectedElement } = dragState.current;

    if (!selectedElement) return;

    const d = selectedElement.getAttribute("d");
    if (d) {
      const transform = selectedElement.getAttribute("transform") || "";
      options.onDragEnd?.(selectedElement, transform);
    }

    selectedElement.blur();
    dragState.current.selectedElement = null;
  }, [options.onDragEnd]);

  const isDragging = useCallback(() => {
    return dragState.current.selectedElement !== null;
  }, []);

  return {
    handleDragStart,
    handleDrag,
    handleDragEnd,
    isDragging,
  };
}
