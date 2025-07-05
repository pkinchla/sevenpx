import classNames from "classnames";
import Portrait from "./Portrait.tsx";
import active from "../signals/ActiveIndex.ts";
import { IS_BROWSER } from "$fresh/runtime.ts";
import useControlScroll from "../utils/hooks/useControlScroll.ts";
import useFocusTrap from "../utils/hooks/useFocusTrap.ts";
import { useRef } from "preact/hooks";
import { Drawing } from "../interfaces/drawing.model.ts";

function ListItem({ drawing, index }: { drawing: Drawing; index: string }) {
  const [blockScroll, allowScroll] = useControlScroll();
  const listItemRef = useRef<HTMLLIElement>(null);
  useFocusTrap(listItemRef, active.value ? true : false);

  if (!drawing) {
    return null;
  }

  const displayName = drawing?.children[0]?.children[0]?.value || drawing.title;

  const buttonClasses = classNames({
    button: true,
    edit: active.value !== index,
    ["disable-editing"]: active.value === index,
  });

  const handleclick = (current: string | null, index: string) => {
    active.value = index === current ? null : index;
    active.value ? blockScroll() : allowScroll();
    listItemRef.current?.focus();
  };

  return (
    <li
      tabIndex={-1}
      ref={listItemRef}
      class={active.value === index ? "active" : ""}
    >
      <Portrait
        viewBox={drawing.attributes.viewBox}
        title={drawing.title}
        paths={drawing.children}
        name={drawing.title}
        active={active.value === index}
      />
      <span class="name">{displayName}</span>
      {IS_BROWSER && (
        <button
          type="button"
          class={buttonClasses}
          onClick={() => handleclick(active.value, index)}
        >
          <span>
            {active.value === index ? "Finish Editing" : "Edit"}
            <span class="visually-hidden">{`${displayName} portrait`}</span>
          </span>
        </button>
      )}
    </li>
  );
}

export default ListItem;
