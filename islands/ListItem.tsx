// import FocusTrap from 'focus-trap-react';
import classNames from 'classnames';
import Portrait from './Portrait.tsx';
import active from '../components/ActiveIndex.tsx';
import { IS_BROWSER } from '$fresh/runtime.ts';
import useControlScroll from '../utils/hooks/useControlScroll.ts';

function ListItem({
  drawing,
  index,
}: {
  drawing: any;
  index: number;
  updateDrawings: void;
}) {
  if (!drawing) {
    return null;
  }

  const [blockScroll, allowScroll] = useControlScroll();

  const buttonClasses = classNames({
    edit: active.value !== index,
    ['disable-editing']: active.value !== index,
  });

  const displayName = drawing?.children[0]?.children[0]?.value || drawing.title;

  const handleclick = (current: number | null, index: number) => {
    active.value = index === current ? null : index;
    active?.value ? blockScroll() : allowScroll();
  };

  return (
    // <FocusTrap active={active === index}>
    <li className={active.value === index ? 'active' : ''}>
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
    // </FocusTrap>
  );
}

export default ListItem;
