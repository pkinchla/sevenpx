import classNames from "classnames";
import Portrait from "./Portrait.tsx";
import active from "../signals/ActiveIndex.ts";
import { IS_BROWSER } from "fresh/runtime";
import useControlScroll from "../utils/hooks/useControlScroll.ts";
import useFocusTrap from "../utils/hooks/useFocusTrap.ts";
import useEscapeKey from "../utils/hooks/useEscapeKey.ts";
import { useRef } from "preact/hooks";
import { Drawing } from "../interfaces/drawing.model.ts";

function ListItem({ drawing, index }: { drawing: Drawing; index: string }) {
  const [blockScroll, allowScroll] = useControlScroll();
  const listItemRef = useRef<HTMLLIElement>(null);
  // close editing when escape key is clicked
  useEscapeKey(() =>
    active.value === index ? handleEditDrawing(active.value, index) : null
  );
  // focus trap the current drawing being edited
  useFocusTrap(listItemRef, active.value ? true : false);

  function handleEditDrawing(current: string | null, index: string) {
    const updateState = () => {
      active.value = index === current ? null : index;
      active.value ? blockScroll() : allowScroll();
      listItemRef.current?.focus();
    };

    if (
      document.startViewTransition &&
      !globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const parent = listItemRef.current?.parentElement;
      const siblings = parent
        ? Array.from(parent.querySelectorAll<HTMLLIElement>("li")).filter(
          (li) => li !== listItemRef.current,
        )
        : [];

      const savedNames = siblings.map((li) =>
        li.style.getPropertyValue("view-transition-name")
      );
      siblings.forEach((li) =>
        li.style.setProperty("view-transition-name", "none")
      );

      const transition = document.startViewTransition(updateState);

      transition.finished.finally(() => {
        siblings.forEach((li, i) =>
          li.style.setProperty("view-transition-name", savedNames[i])
        );
      });
    } else {
      updateState();
    }
  }

  if (!drawing) {
    return null;
  }

  const displayName = drawing?.children[0]?.children[0]?.value || drawing.title;

  const buttonClasses = classNames({
    button: true,
    edit: active.value !== index,
    ["disable-editing"]: active.value === index,
  });

  return (
    <li
      tabIndex={-1}
      ref={listItemRef}
      class={active.value === index ? "active" : ""}
      style={{ viewTransitionName: `list-item-${index}` }}
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
          onClick={() => handleEditDrawing(active.value, index)}
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
