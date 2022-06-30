import { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import Logo from '../components/Logo';
import ListItem from '../components/ListItem';

export default function Drawings(props) {
  const [active, setActive] = useState(null);
  const { drawings, updateDrawings, domReady } = props;

  return (
    <Fragment>
      <div className="drawing-page base-layout">
        <span className="title">
          <Link href="/" as="/">
            <a>
              <Logo />
            </a>
          </Link>
        </span>
        <section>
          <header className="header">
            <h1 className="page-title" tabIndex="-1">
              Drawings
            </h1>
            <Link href="/" as="/">
              <a className="single-link">Home</a>
            </Link>
          </header>
          <div className="content">
            <ul className="drawings">
              {drawings.map((drawing, index) => {
                return (
                  <ListItem
                    key={index}
                    index={index}
                    updateDrawings={updateDrawings}
                    drawing={drawing}
                    domReady={domReady}
                    setActive={setActive}
                    active={active}
                  />
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export function getStaticProps() {
  return {
    props: {
      title: 'Seven Pixels | Drawings',
      description:
        'A list of vector drawings that can edited in the browser. as each drawing is updated the backround collage will update',
    },
  };
}

Drawings.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  domReady: PropTypes.bool,
};
