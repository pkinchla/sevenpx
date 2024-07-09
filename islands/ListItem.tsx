// import FocusTrap from 'focus-trap-react';
import classNames from 'classnames';
import Portrait from './Portrait.tsx';
import active from '../components/ActiveIndex.tsx';
import { IS_BROWSER } from '$fresh/runtime.ts';
import useControlScroll from '../utils/hooks/useControlScroll.ts';
import useFocusTrap from '../utils/hooks/useFocusTrap.ts';
import { useRef } from 'preact/hooks';
import { Drawing } from '../utils/interfaces/drawing.ts';

function ListItem({ drawing, index }: { drawing: Drawing; index: string }) {
  if (!drawing) {
    return null;
  }

  const displayName = drawing?.children[0]?.children[0]?.value || drawing.title;
  const [blockScroll, allowScroll] = useControlScroll();
  const listItemRef = useRef<HTMLLIElement>(null);
  useFocusTrap(listItemRef, active.value ? true : false);

  const buttonClasses = classNames({
    edit: active.value !== index,
    ['disable-editing']: active.value === index,
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
      className={active.value === index ? 'active' : ''}
    >
      <Portrait
        viewBox={drawing.attributes.viewBox}
        title={drawing.title}
        paths={drawing.children}
        name={drawing.title}
        active={active.value === index}
      />
      <span className="name">{displayName}</span>
      {IS_BROWSER && (
        <button
          className={buttonClasses}
          onClick={() => handleclick(active.value, index)}
        >
          <span>
            {active.value === index ? 'Finish Editing' : 'Edit'}
            <span className="assistive-text">{`${displayName} portrait`}</span>
          </span>
        </button>
      )}
    </li>
  );
}

export default ListItem;
