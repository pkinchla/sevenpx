import { useEffect, useRef } from 'preact/hooks';
import drawings, { updateDrawings } from '../components/DrawingsSignal.tsx';

export default function Portrait({ active, name, viewBox, title, paths }) {
  const drawing = useRef(null);

  function makeDraggable() {
    var svg = drawing?.current;
    svg.addEventListener('mousedown', startDrag, false);
    svg.addEventListener('mousemove', drag, false);
    svg.addEventListener('mouseup', endDrag, false);
    svg.addEventListener('touchstart', startDrag);
    svg.addEventListener('touchmove', drag);
    svg.addEventListener('touchend', endDrag);
    svg.addEventListener('touchleave', endDrag);
    svg.addEventListener('touchcancel', endDrag);

    var selectedElement, dragX, dragY;
    var reTranslate = /translate\s*\(([-+\d.\s,e]+)\)/gi;

    function startDrag(evt) {
      if (evt.target.classList.contains('draggable')) {
        if (evt.touches) {
          evt = evt.touches[0];
        }
        var screenMatrix = svg.getScreenCTM();
        selectedElement = evt.target;
        dragX = evt.clientX / screenMatrix.a;
        dragY = evt.clientY / screenMatrix.d;

        // Parse existing translate transform
        var transform = selectedElement.getAttributeNS(null, 'transform');
        var translate = reTranslate.exec(transform);
        if (translate) {
          var digits = translate[1].split(/\s*[,\s]+/);
          dragX -= parseFloat(digits[0] || 0);
          dragY -= parseFloat(digits[1] || 0);
        } else {
          // We need to add a translate transform if there isn't already one
          translate = 'translate(0, 0)';
          if (transform) {
            selectedElement.setAttributeNS(
              null,
              'transform',
              translate + transform
            );
          } else {
            selectedElement.setAttributeNS(null, 'transform', translate);
          }
        }
      }
    }

    function drag(evt) {
      if (selectedElement) {
        var screenMatrix = svg.getScreenCTM();
        if (evt.touches) {
          evt = evt.touches[0];
        }
        var x = evt.clientX / screenMatrix.a - dragX;
        var y = evt.clientY / screenMatrix.d - dragY;

        // Remove the existing translate and replace with the new one
        var transform = selectedElement.getAttributeNS(null, 'transform');
        transform = transform.replace(
          reTranslate,
          'translate(' + x + ' ' + y + ')'
        );
        selectedElement.setAttributeNS(null, 'transform', transform);
      }
    }

    function endDrag(e) {
      if (!e.target.getAttribute('d')) {
        return;
      }

      const getPath = (element: SVGMPathElement) =>
        element.attributes.d === e.target.getAttribute('d');
      const getIndex = paths.findIndex(getPath);

      updateDrawings(
        name,
        e.target.getAttribute('d'),
        getIndex,
        e.target.getAttribute('transform')
      );

      selectedElement.blur();
      selectedElement = false;
    }
  }

  useEffect(() => {
    makeDraggable();
  });

  return (
    <svg
      role="application"
      ref={drawing}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      <title>{title}</title>
      {paths.map((item: any, index: number) => {
        if (item.name !== 'path') {
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
