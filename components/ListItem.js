import FocusTrap from 'focus-trap-react';
import Portrait from './Portrait';
import classNames from 'classnames';

function ListItem({
  drawing,
  index,
  updateDrawings,
  domReady,
  setActive,
  active,
}) {
  function handleClick(index) {
    if (index === active) {
      return setActive(null);
    }
    return setActive(index);
  }

  const liClasses = classNames({
    active: active === index,
  });

  const buttonClasses = classNames({
    edit: active !== index,
    ['disable-editing']: active !== index,
  });

  return (
    <FocusTrap active={active === index}>
      <li className={liClasses}>
        <Portrait
          viewBox={drawing.attributes.viewBox}
          title={drawing.title}
          paths={drawing.children}
          updateDrawings={updateDrawings}
          name={drawing.title}
        />
        <span className="name">{drawing.title}</span>
        {domReady && (
          <button className={buttonClasses} onClick={() => handleClick(index)}>
            <span>
              {active === index ? 'Finish Editing' : 'Edit'}
              <span className="assistive-text">{`${drawing.title} portrait`}</span>
            </span>
          </button>
        )}
      </li>
    </FocusTrap>
  );
}

export default ListItem;
