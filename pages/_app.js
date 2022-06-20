import { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from '../components/Head';
import '../styles/globals.css';

import svgs from '../svgs';
import Vector from '../components/VectorCollage';

function App({ Component, pageProps }) {
  const [domReady, setReady] = useState(false);
  const [drawings, setDrawings] = useState(svgs);

  useEffect(() => {
    setReady(true);
  }, [domReady]);

  function updateDrawings(title, path, index, transform) {
    // copy current state
    const portraits = [...this.state.portraits];
    // filter out target svg based on title
    const target = portraits.filter((item) => {
      return item.children[0].children[0].value === title;
    });

    // update appropriate path
    target[0].children.map((item, path_index) => {
      if (index === path_index) {
        item.attributes.d = path;
        item.attributes.transform = transform;
      }
    });
    // // update copy with new portrait
    portraits.map((item) => {
      if (item.children[0].children[0].value === title) {
        item = target[0];
      }
    });

    setDrawings({ portraits });
  }

  const props = { ...pageProps, updateDrawings, domReady, drawings };

  return (
    <Fragment>
      <Head {...pageProps} />
      <Component {...props} />
      <Vector svgs={drawings} />
    </Fragment>
  );
}

App.propTypes = {
  domReady: PropTypes.bool,
  pageProps: PropTypes.object,
};

export default App;
