import FocusTrap from 'focus-trap-react';
import classNames from 'classnames';
import Portrait from './Portrait';
import useControlScroll from './hooks/useControlScroll';

function ListItem({
  drawing,
  index,
  updateDrawings,
  domReady,
  setActive,
  active,
}) {
  const [blockScroll, allowScroll] = useControlScroll();

  if (!drawing) {
    return null;
  }

  function handleClick(index) {
    if (index === active) {
      allowScroll();
      return setActive(null);
    }
    blockScroll();
    return setActive(index);
  }

  const liClasses = classNames({
    active: active === index,
  });

  const buttonClasses = classNames({
    edit: active !== index,
    ['disable-editing']: active !== index,
  });

  const displayName = drawing?.children[0]?.children[0]?.value || drawing.title;

  return (
    <FocusTrap active={active === index}>
      <li className={liClasses}>
        <Portrait
          viewBox={drawing.attributes.viewBox}
          title={drawing.title}
          paths={drawing.children}
          updateDrawings={updateDrawings}
          name={drawing.title}
          active={active === index}
        />
        <span className="name">{displayName}</span>
        {domReady && (
          <button className={buttonClasses} onClick={() => handleClick(index)}>
            <span>
              {active === index ? 'Finish Editing' : 'Edit'}
              <span className="assistive-text">{`${displayName} portrait`}</span>
            </span>
          </button>
        )}
      </li>
    </FocusTrap>
  );
}

export default ListItem;
